import fox_img from '../../../assets/imgs/fox-hero-D8H5Gfnq.jpg'

function LoreContent() {
    const stats = [
        { label: 'TOKEN', value: '$FFS' },
        { label: 'CHAIN',  value: 'Cronos' },
        { label: 'SUPPLY', value: '1B' },
    ]

    return (
        <div className='flex flex-col md:flex-row gap-10 px-8 md:px-16 py-8 items-start'>

            {/* Left — image */}
            <div className='shrink-0 rounded-2xl overflow-hidden border border-white/10 w-full md:w-[420px]'>
                <img
                    src={fox_img}
                    alt='For Fox Sake'
                    className='w-full h-full object-cover'
                />
            </div>

            {/* Right — text + stats */}
            <div className='flex flex-col gap-6 text-white/70 text-base leading-relaxed'>
                <p>
                    Beneath the neon spires of the Cronos underworld, a hooded fox
                    runs a tavern that doesn't appear on any map. Inside, a single
                    bottle of mystical sake sits on the bar — glowing, breathing,
                    waiting.
                </p>
                <p>
                    Every degen who steps in pours their $FFS into the bottle. The
                    bottle drinks them in. And at random, without warning, the bottle{' '}
                    <span className='text-purple-400 cursor-pointer hover:text-purple-300 transition-colors'>
                        sips back
                    </span>
                    .
                </p>
                <p>
                    One soul walks out with the entire treasury. The rest? They refill
                    the bottle for the next round. That's the deal. That's the tavern.
                    That's For Fox Sake.
                </p>

                {/* Stat cards */}
                <div className='flex gap-3 mt-2'>
                    {stats.map((s) => (
                        <div
                            key={s.label}
                            className='flex flex-col gap-1 px-6 py-4 rounded-xl
                                       border border-white/10 bg-white/5 backdrop-blur-sm'
                        >
                            <p className='text-white/40 text-xs tracking-widest uppercase'>
                                {s.label}
                            </p>
                            <p className='text-white font-semibold text-lg'>
                                {s.value}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default LoreContent