import right_img from '../../../assets/imgs/fox-mascot-D5VOPyRA.jpg'
import { Trophy } from "lucide-react"
import { useAccount, useWriteContract } from 'wagmi'
import { waitForTransactionReceipt } from '@wagmi/core'
import { FFS_BOTTLE_ABI, FFS_BOTTLE_ADDRESS } from '../../../constants/contracts'
import { useState } from 'react'

function Buy(){
  const { address } = useAccount()
  const { writeContractAsync, isPending } = useWriteContract()
  const [txStatus, setTxStatus] = useState('')

  const handlePour = async () => {
    if (!address) {
      alert('Please connect your wallet first')
      return
    }
    try {
      setTxStatus('Approving and pouring...')
      const hash = await writeContractAsync({
        address: FFS_BOTTLE_ADDRESS,
        abi: FFS_BOTTLE_ABI,
        functionName: 'pour',
        account: address,
      })
      setTxStatus('Transaction sent! Hash: ' + hash.slice(0, 10) + '...')
    } catch (error) {
      setTxStatus('Error: ' + (error?.message || 'Unknown error'))
    }
  }
    return(
        <section className='flex flex-col md:flex-row justify-between items-center
                            mx-4 md:mx-16 rounded-2xl border border-white/10 
                            bg-white/5 backdrop-blur-sm px-8 py-8 gap-6'>
            <div className='flex flex-col gap-4'>
                <div className='text-cyan-300 flex items-center gap-1 uppercase'>
                    <Trophy className='w-4'/>
                    <p className='text-xs tracking-widest font-semibold'>Last Sip</p>
                </div>
                <div className='flex flex-col gap-3'>
                    <h1 className='text-6xl font-extrabold bg-fire bg-clip-text text-transparent'>
                        0 $FFS
                    </h1>
                    <p className='text-white/60 text-sm'>
                        No sips yet — be the first to pour and start the round.
                    </p>
                    <button 
                      onClick={handlePour}
                      disabled={isPending}
                      className='w-fit mt-2 px-6 py-3 rounded-xl font-bold 
                                       uppercase tracking-widest text-white text-sm
                                       bg-pink-500 shimmer
                                       transition-all duration-300
                                       hover:shadow-[0_0_20px_6px_rgba(236,72,153,0.6)]
                                       disabled:opacity-50 disabled:cursor-not-allowed'>
                        {isPending ? 'Pouring...' : 'Pour Your Sake →'}
                    </button>
                    {txStatus && <p className='text-xs text-yellow-300 mt-2'>{txStatus}</p>}
                </div>
            </div>

            <div className='relative rounded-2xl overflow-hidden border border-orange-500/30 shrink-0'
                 style={{ width: '200px', height: '200px' }}>
                <img 
                    className='w-full h-full object-cover' 
                    src={right_img} 
                    alt='fox mascot'
                />
            </div>
        </section>
    )
}

export default Buy