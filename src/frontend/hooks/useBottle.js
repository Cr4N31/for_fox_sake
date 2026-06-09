import { useState, useRef, useEffect } from 'react'
import { useAppKitAccount } from '@reown/appkit/react'
import { useReadContract, useWatchContractEvent, useWriteContract, useConfig } from 'wagmi'
import { waitForTransactionReceipt } from '@wagmi/core'
import { formatUnits } from 'viem'
import {
  FFS_BOTTLE_ABI,
  FFS_BOTTLE_ADDRESS,
  FFS_TOKEN_ABI,
  FFS_TOKEN_ADDRESS,
  isContractConfigured,
} from '../../constants/contracts'

const toNumber = (value = 0n) => Number(formatUnits(value, 18))

export function useBottle({ onPourEvent, onSipEvent, onPourConfirmed } = {}) {
  const { address, isConnected } = useAppKitAccount()
  const { writeContractAsync } = useWriteContract()
  const config = useConfig()
  const [isPouring, setIsPouring] = useState(false)
  const [isApproving, setIsApproving] = useState(false)
  const [transactionStatus, setTransactionStatus] = useState('')
  const [transactionError, setTransactionError] = useState('')

  // Stable refs for callbacks so they don't cause re-renders
  const onPourEventRef = useRef(onPourEvent)
  const onSipEventRef = useRef(onSipEvent)
  const onPourConfirmedRef = useRef(onPourConfirmed)

  useEffect(() => { onPourEventRef.current = onPourEvent }, [onPourEvent])
  useEffect(() => { onSipEventRef.current = onSipEvent }, [onSipEvent])
  useEffect(() => { onPourConfirmedRef.current = onPourConfirmed }, [onPourConfirmed])

  const { data: bottleBalance = 0n, refetch: refetchBottleBalance } = useReadContract({
    address: FFS_BOTTLE_ADDRESS,
    abi: FFS_BOTTLE_ABI,
    functionName: 'bottleBalance',
    watch: true,
    enabled: isContractConfigured,
  })

  const { data: participantsCount = 0n, refetch: refetchParticipantsCount } = useReadContract({
    address: FFS_BOTTLE_ADDRESS,
    abi: FFS_BOTTLE_ABI,
    functionName: 'roundPours',
    watch: true,
    enabled: isContractConfigured,
  })

  const { data: roundNumber = 0n, refetch: refetchRoundNumber } = useReadContract({
    address: FFS_BOTTLE_ADDRESS,
    abi: FFS_BOTTLE_ABI,
    functionName: 'currentRound',
    watch: true,
    enabled: isContractConfigured,
  })

  const { data: fillPercent = 0n, refetch: refetchFillPercent } = useReadContract({
    address: FFS_BOTTLE_ADDRESS,
    abi: FFS_BOTTLE_ABI,
    functionName: 'fillPercent',
    watch: true,
    enabled: isContractConfigured,
  })

  const { data: totalSips = 0n, refetch: refetchTotalSips } = useReadContract({
    address: FFS_BOTTLE_ADDRESS,
    abi: FFS_BOTTLE_ABI,
    functionName: 'totalSips',
    watch: true,
    enabled: isContractConfigured,
  })

  const { data: pourAmount = 1000n * 10n ** 18n } = useReadContract({
    address: FFS_BOTTLE_ADDRESS,
    abi: FFS_BOTTLE_ABI,
    functionName: 'POUR_AMOUNT',
    watch: true,
    enabled: isContractConfigured,
  })

  const { data: currentAllowance = 0n, refetch: refetchAllowance } = useReadContract({
    address: FFS_TOKEN_ADDRESS,
    abi: FFS_TOKEN_ABI,
    functionName: 'allowance',
    args: [address, FFS_BOTTLE_ADDRESS],
    enabled: isContractConfigured && !!address,
  })

  const [sipNonce, setSipNonce] = useState(0)

  const refreshContractData = async () => {
    if (!isContractConfigured) return
    await Promise.all([
      refetchBottleBalance(),
      refetchParticipantsCount(),
      refetchRoundNumber(),
      refetchFillPercent(),
      refetchTotalSips(),
      refetchAllowance(),
    ])
  }

  useWatchContractEvent({
    address: isContractConfigured ? FFS_BOTTLE_ADDRESS : undefined,
    abi: FFS_BOTTLE_ABI,
    eventName: 'Poured',
    onLogs(logs) {
      try {
        if (!logs?.length) return
        refreshContractData().catch((error) => console.error('Failed to refresh on Poured:', error))
        onPourEventRef.current?.()
      } catch (err) {
        console.error('Error handling Poured event:', err)
      }
    },
  })

  useWatchContractEvent({
    address: isContractConfigured ? FFS_BOTTLE_ADDRESS : undefined,
    abi: FFS_BOTTLE_ABI,
    eventName: 'BottleSipped',
    onLogs(logs) {
      try {
        if (!logs?.length) return
        refreshContractData().catch((error) => console.error('Failed to refresh on BottleSipped:', error))
        const latest = logs[logs.length - 1]
        setSipNonce((current) => current + 1)
        const winnerPayload = {
          winner: latest.args.winner
            ? `${latest.args.winner.slice(0, 6)}...${latest.args.winner.slice(-4)}`
            : '',
          amount: toNumber(latest.args.winnerAmount),
        }
        onSipEventRef.current?.(winnerPayload)
      } catch (err) {
        console.error('Error handling BottleSipped event:', err)
      }
    },
  })

  const handlePour = async () => {
    if (!isContractConfigured || !isConnected || isPouring) return

    setIsPouring(true)
    setTransactionError('')
    setTransactionStatus('')

    try {
      if (currentAllowance < pourAmount) {
        setIsApproving(true)
        setTransactionStatus('Approving FFS spend...')
        const approveHash = await writeContractAsync({
          address: FFS_TOKEN_ADDRESS,
          abi: FFS_TOKEN_ABI,
          functionName: 'approve',
          args: [FFS_BOTTLE_ADDRESS, pourAmount],
          gas: 100000n,
        })
        setTransactionStatus('Waiting for approval confirmation...')
        const approveReceipt = await waitForTransactionReceipt(config, { hash: approveHash })
        if (approveReceipt?.status !== 'success') {
          throw new Error('Approval transaction failed or was reverted.')
        }
        await refetchAllowance()
        setIsApproving(false)
      }

      setTransactionStatus('Submitting bottle pour...')
      const pourHash = await writeContractAsync({
        address: FFS_BOTTLE_ADDRESS,
        abi: FFS_BOTTLE_ABI,
        functionName: 'pour',
        args: [],
        gas: 300000n,
      })
      setTransactionStatus('Confirming bottle pour...')
      const receipt = await waitForTransactionReceipt(config, { hash: pourHash })
      if (receipt?.status !== 'success') throw new Error('Bottle pour transaction failed or was reverted on-chain.')

      await refreshContractData()
      await onPourConfirmedRef.current?.()
      setTransactionStatus('Bottle pour confirmed')
    } catch (error) {
      console.error('Pour transaction failed:', error)
      console.error('Pour error details:', {
        message: error?.message,
        code: error?.code,
        shortMessage: error?.shortMessage,
        stack: error?.stack,
        data: error?.data,
      })
      setTransactionError(error?.shortMessage || error?.message || 'Transaction failed')
      setTransactionStatus('')
      setIsApproving(false)
    } finally {
      setIsPouring(false)
    }
  }

  return {
    treasury: toNumber(bottleBalance),
    participants: Number(participantsCount),
    roundNumber: Number(roundNumber),
    fillPercent: Number(fillPercent),
    totalSips: Number(totalSips),
    sipNonce,
    handlePour,
    isPouring,
    isApproving,
    transactionStatus,
    transactionError,
    isConnected,
    refreshContractData,
  }
}