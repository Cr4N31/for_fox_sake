import fox_img from '../../../assets/imgs/fox-hero-D8H5Gfnq.jpg'

const formatTimeAgo = (timestamp) => {
    if (!timestamp) return 'just now'

    const date = new Date(timestamp)
    if (Number.isNaN(date.getTime())) return 'just now'

    const diffMs = Date.now() - date.getTime()
    if (diffMs < 60000) return 'just now'
    if (diffMs < 3600000) return `${Math.round(diffMs / 60000)} min${Math.round(diffMs / 60000) === 1 ? '' : 's'} ago`
    if (diffMs < 86400000) return `${Math.round(diffMs / 3600000)} hr${Math.round(diffMs / 3600000) === 1 ? '' : 's'} ago`
    return `${Math.round(diffMs / 86400000)} day${Math.round(diffMs / 86400000) === 1 ? '' : 's'} ago`
}

function LivePours({ pours = [] }) {
    console.log('LivePours received:', pours) 
    return (
        <div className='rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-5 flex flex-col gap-3'>

            {/* Header */}
            <div className='flex items-center justify-between'>
                <p className='text-white/70 text-xs tracking-widest uppercase font-semibold'>
                    Live Pours
                </p>
                <div className='w-2 h-2 rounded-full bg-cyan-400 animate-pulse' />
            </div>

            {/* Empty state */}
            {pours.length === 0 ? (
                <div className='flex flex-col items-center justify-center py-8 gap-3'>
                    <div className='w-16 h-16 rounded-full overflow-hidden border border-white/10'>
                        <img src={fox_img} alt='fox' className='w-full h-full object-cover' />
                    </div>
                    <p className='text-white/50 text-sm'>No pours yet.</p>
                    <p className='text-cyan-400 text-xs tracking-widest uppercase'>
                        Tavern is silent...
                    </p>
                </div>
            ) : (
                <ul className='flex flex-col gap-3'>
                    {pours.map((pour, i) => (
                        <li key={pour.transactionHash || i} className='rounded-2xl border border-white/10 bg-black/20 p-3'>
                            <div className='flex items-center justify-between gap-2 text-xs text-white/50'>
                                <span>{pour.round != null ? `Round ${pour.round}` : 'Round ?'}</span>
                                <span>{formatTimeAgo(pour.timestamp)}</span>
                            </div>
                            <div className='mt-2 flex items-center justify-between gap-4'>
                                <div>
                                    <p className='text-white/80 font-mono'>{pour.address}</p>
                                    <p className='text-white/50 uppercase tracking-[0.18em] text-[10px]'>
                                        {pour.type === 'sip' ? 'Bottle Sip' : 'Pour'}
                                    </p>
                                </div>
                                <div className={`text-right font-semibold ${pour.type === 'sip' ? 'text-pink-300' : 'text-cyan-300'}`}>
                                    {Number(pour.amount).toLocaleString()} $FFS
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default LivePours
