import { useState, useEffect, useMemo } from "react"
import AOS from 'aos'
import img from './assets/imgs/bg-fox.jpeg'
import Header from "./frontend/shared/Header"
import Sidebar from "./frontend/shared/Sidebar"
import Layout from "./frontend/Layout"
import Footer from "./frontend/shared/Footer"
import { waitForTransactionReceipt } from '@wagmi/core'
import { formatUnits } from 'viem'
import { useAccount, useConfig, useReadContract, useWatchContractEvent, useWriteContract } from 'wagmi'
import {
  FFS_BOTTLE_ABI,
  FFS_BOTTLE_ADDRESS,
  FFS_TOKEN_ABI,
  FFS_TOKEN_ADDRESS,
  isContractConfigured,
} from './constants/contracts'

const formatAddress = (address = '') =>
  address ? `${address.slice(0, 6)}...${address.slice(-4)}` : ''

const formatTokenAmount = (value = 0n) => Number(formatUnits(value, 18))
const apiBaseUrl = import.meta.env.VITE_FFS_API_URL || 'http://localhost:8787'

function App() {
  const config = useConfig()
  const { address } = useAccount()
  const { writeContractAsync, isPending } = useWriteContract()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState('HOME')
  const [pours, setPours] = useState([])
  const [winnerHistory, setWinnerHistory] = useState([])
  const [lastWinner, setLastWinner] = useState({ winner: '', amount: 0 })
  const [sipNonce, setSipNonce] = useState(0)
  const [indexedStats, setIndexedStats] = useState(null)

  const readQuery = { enabled: isContractConfigured }

  const { data: bottleBalance = 0n, refetch: refetchBottleBalance } = useReadContract({
    address: FFS_BOTTLE_ADDRESS,
    abi: FFS_BOTTLE_ABI,
    functionName: 'bottleBalance',
    query: readQuery,
  })

  const { data: participants = 0n, refetch: refetchParticipants } = useReadContract({
    address: FFS_BOTTLE_ADDRESS,
    abi: FFS_BOTTLE_ABI,
    functionName: 'roundPours',
    query: readQuery,
  })

  const { data: fillPercent = 0n, refetch: refetchFillPercent } = useReadContract({
    address: FFS_BOTTLE_ADDRESS,
    abi: FFS_BOTTLE_ABI,
    functionName: 'fillPercent',
    query: readQuery,
  })

  const { data: totalSips = 0n, refetch: refetchTotalSips } = useReadContract({
    address: FFS_BOTTLE_ADDRESS,
    abi: FFS_BOTTLE_ABI,
    functionName: 'totalSips',
    query: readQuery,
  })

  const { data: pourAmount = 1000n * 10n ** 18n } = useReadContract({
    address: FFS_BOTTLE_ADDRESS,
    abi: FFS_BOTTLE_ABI,
    functionName: 'POUR_AMOUNT',
    query: readQuery,
  })

  const { data: allowance = 0n, refetch: refetchAllowance } = useReadContract({
    address: FFS_TOKEN_ADDRESS,
    abi: FFS_TOKEN_ABI,
    functionName: 'allowance',
    args: address ? [address, FFS_BOTTLE_ADDRESS] : undefined,
    query: { enabled: isContractConfigured && Boolean(address) },
  })

  const refreshBottleReads = async () => {
    await Promise.all([
      refetchBottleBalance(),
      refetchParticipants(),
      refetchFillPercent(),
      refetchTotalSips(),
      refetchAllowance(),
    ])
  }

  const treasury = useMemo(() => formatTokenAmount(bottleBalance), [bottleBalance])
  const liveParticipants = Number(participants)
  const liveTotalSips = indexedStats?.totalSips ?? Number(totalSips)
  const liveFillPercent = Number(fillPercent)

  useEffect(() => {
    AOS.init({
      once: true,
      duration: 700,
      easing: 'ease-out-cubic',
      anchorPlacement: 'top-bottom',
    })
  }, [])

  const handleNavigate = (page) => {
    setCurrentPage(page)
    setSidebarOpen(false) // close sidebar on navigate
  }

  useEffect(() => {
    let cancelled = false

    const loadIndexedData = async () => {
      try {
        const [activityResponse, winnersResponse, statsResponse] = await Promise.all([
          fetch(`${apiBaseUrl}/api/activity`),
          fetch(`${apiBaseUrl}/api/winners`),
          fetch(`${apiBaseUrl}/api/stats`),
        ])

        if (!activityResponse.ok || !winnersResponse.ok || !statsResponse.ok) return

        const [{ activity }, { winners }, stats] = await Promise.all([
          activityResponse.json(),
          winnersResponse.json(),
          statsResponse.json(),
        ])

        if (cancelled) return

        setPours(activity.map((item) => ({
          type: item.type,
          address: item.shortAddress,
          amount: Number(item.amount),
          transactionHash: item.transactionHash,
        })))
        setWinnerHistory(winners)
        setIndexedStats(stats)

        if (winners.length > 0) {
          setLastWinner({
            winner: winners[0].shortWinner,
            amount: Number(winners[0].winnerAmount),
          })
        }
      } catch {
        // The frontend can still operate from direct chain reads if the indexer is offline.
      }
    }

    loadIndexedData()
    const interval = setInterval(loadIndexedData, 15000)

    return () => {
      cancelled = true
      clearInterval(interval)
    }
  }, [])

  useWatchContractEvent({
    address: isContractConfigured ? FFS_BOTTLE_ADDRESS : undefined,
    abi: FFS_BOTTLE_ABI,
    eventName: 'Poured',
    onLogs(logs) {
      setPours((current) => [
        ...logs.map((log) => ({
          type: 'pour',
          address: formatAddress(log.args.user),
          amount: formatTokenAmount(log.args.amount),
        })).reverse(),
        ...current,
      ].slice(0, 6))
      refreshBottleReads()
    },
  })

  useWatchContractEvent({
    address: isContractConfigured ? FFS_BOTTLE_ADDRESS : undefined,
    abi: FFS_BOTTLE_ABI,
    eventName: 'BottleSipped',
    onLogs(logs) {
      const latest = logs[logs.length - 1]
      if (!latest) return

      setLastWinner({
        winner: formatAddress(latest.args.winner),
        amount: formatTokenAmount(latest.args.winnerAmount),
      })
      setWinnerHistory((current) => [{
        id: `${latest.transactionHash}-${latest.logIndex}`,
        round: latest.args.round.toString(),
        shortWinner: formatAddress(latest.args.winner),
        winnerAmount: formatTokenAmount(latest.args.winnerAmount),
        treasuryAmount: formatTokenAmount(latest.args.treasuryAmount),
        transactionHash: latest.transactionHash,
      }, ...current].slice(0, 10))
      setSipNonce((current) => current + 1)
      refreshBottleReads()
    },
  })

  const handlePour = async () => {
    if (!isContractConfigured || !address || isPending) return

    if (allowance < pourAmount) {
      const approveHash = await writeContractAsync({
        address: FFS_TOKEN_ADDRESS,
        abi: FFS_TOKEN_ABI,
        functionName: 'approve',
        args: [FFS_BOTTLE_ADDRESS, pourAmount],
      })
      await waitForTransactionReceipt(config, { hash: approveHash })
    }

    const pourHash = await writeContractAsync({
      address: FFS_BOTTLE_ADDRESS,
      abi: FFS_BOTTLE_ABI,
      functionName: 'pour',
    })
    await waitForTransactionReceipt(config, { hash: pourHash })
    await refreshBottleReads()
  }

  return (
    <div className='relative min-h-screen flex flex-col'>

      {/* Background image + overlay */}
      <div
        className='fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat'
        style={{ backgroundImage: `url(${img})` }}
      >
        <div className='absolute inset-0 bg-[#0d0718]/80' />
        <div className='absolute inset-0 bg-gradient-to-r from-pink-800/30 to-purple-800/30' />
      </div>

      <Header
        isOpen={sidebarOpen}
        onMenuClick={() => setSidebarOpen((open) => !open)}
        onNavigate={handleNavigate}
        currentPage={currentPage}
      />

      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onNavigate={handleNavigate}
        currentPage={currentPage}
      />

      <main className='flex-grow'>
        <Layout
          currentPage={currentPage}
          onNavigate={handleNavigate}
          treasury={treasury}
          holders={liveParticipants}
          totalSips={liveTotalSips}
          participants={liveParticipants}
          pours={pours}
          lastWinner={lastWinner}
          winnerHistory={winnerHistory}
          fillPercent={liveFillPercent}
          onPour={handlePour}
          mockTokenHoldings={[]}
          sipNonce={sipNonce}
          isPouring={isPending}
        />
      </main>

      <Footer onNavigate={handleNavigate} />

    </div>
  )
}

export default App
