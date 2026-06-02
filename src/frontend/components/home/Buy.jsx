import { useState } from 'react'
import { Trophy } from 'lucide-react'
import right_img from '../../../assets/imgs/fox-mascot-D5VOPyRA.jpg'
import { useAppKitAccount } from '@reown/appkit/react'

function Buy({ onPour, isPouring = false, transactionStatus = '', transactionError = '', lastWinner = { winner: '', amount: 0 } }) {
    const [txStatus, setTxStatus] = useState('')
    const { isConnected } = useAppKitAccount()

    const handleClick = async () => {
        setTxStatus('')
        try {
            await onPour?.()
            setTxStatus('Transaction confirmed')
        } catch (error) {
            setTxStatus('Error: ' + (error?.shortMessage || error?.message || 'Unknown error'))
        }
    }

    return (
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
                        {lastWinner.amount > 0
                            ? `${lastWinner.amount.toLocaleString()} $FFS`
                            : '0 $FFS'
                        }
                    </h1>
                    <p className='text-white/60 text-sm'>
                        {lastWinner.winner
                            ? `${lastWinner.winner} walked away with the treasury.`
                            : 'No sips yet - be the first to pour and start the round.'
                        }
                    </p>
                    <button
                        onClick={handleClick}
                        disabled={isPouring || !isConnected}
                        className='w-fit mt-2 px-6 py-3 rounded-xl font-bold 
                                   uppercase tracking-widest text-white text-sm
                                   bg-pink-500 shimmer
                                   transition-all duration-300
                                   hover:shadow-[0_0_20px_6px_rgba(236,72,153,0.6)]
                                   disabled:opacity-50 disabled:cursor-not-allowed'>
                        {isPouring ? 'Transaction pending...' : 'Pour Your Sake'}
                    </button>
                    {(transactionStatus || txStatus) && (
                        <p className='text-xs text-yellow-300 mt-2'>{transactionStatus || txStatus}</p>
                    )}
                    {transactionError && (
                        <p className='text-xs text-red-300 mt-2'>{transactionError}</p>
                    )}
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
