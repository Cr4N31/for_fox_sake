import fox_img from '../../../assets/imgs/fox-hero-D8H5Gfnq.jpg'

function LivePours({ pours = [] }) {
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
                <ul className='flex flex-col gap-2'>
                    {pours.map((pour, i) => (
                        <li key={i} className='flex items-center justify-between text-sm'>
                            <span className='text-white/60 font-mono'>{pour.address}</span>
                            <span className='text-cyan-300 font-semibold'>{pour.amount} $FFS</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default LivePours