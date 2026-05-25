import fox_img from '../../../assets/imgs/fox-hero-D8H5Gfnq.jpg'

function LastWinner({ winner = null, amount = 0, winners = [] }) {
    return (
        <div className='rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-5'>
            <p className='text-white/70 text-xs tracking-widest uppercase font-semibold mb-4'>
                Last Winner
            </p>
            <div className='flex items-center gap-3'>
                <div className='w-12 h-12 rounded-full overflow-hidden border border-purple-500/40 shrink-0'>
                    <img src={fox_img} alt='winner' className='w-full h-full object-cover' />
                </div>
                <div>
                    {winner ? (
                        <>
                            <p className='text-white font-semibold text-sm font-mono'>{winner}</p>
                            <p className='text-cyan-300 font-bold'>{amount} $FFS</p>
                        </>
                    ) : (
                        <>
                            <div className='flex gap-1 mb-1'>
                                {[...Array(4)].map((_, i) => (
                                    <div key={i} className='w-5 h-1.5 rounded-full bg-white/20' />
                                ))}
                            </div>
                            <p className='text-pink-400 font-bold text-sm'>0 $FFS</p>
                            <p className='text-white/30 text-xs uppercase tracking-widest'>
                                Awaiting first sip
                            </p>
                        </>
                    )}
                </div>
            </div>
            {winners.length > 0 && (
                <ul className='mt-4 flex flex-col gap-2 border-t border-white/10 pt-4'>
                    {winners.slice(0, 5).map((entry, i) => (
                        <li key={entry.transactionHash || i} className='flex items-center justify-between text-xs'>
                            <span className='text-white/45 font-mono'>{entry.shortWinner}</span>
                            <span className='text-pink-300 font-semibold'>
                                {Number(entry.winnerAmount).toLocaleString()} $FFS
                            </span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default LastWinner
