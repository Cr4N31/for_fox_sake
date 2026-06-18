import fox_img from '../../../assets/imgs/fox-hero-D8H5Gfnq.jpg'

function LoreContent() {
    const stats = [
        { label: 'TOKEN', value: '$FFS' },
        { label: 'CHAIN',  value: 'Cronos' },
        { label: 'SUPPLY', value: '1B' },
    ]

    return (
        <div className='max-w-7xl mx-auto px-6 sm:px-10 md:px-16 py-8'>
            <div className='flex flex-col lg:flex-row gap-10 items-start'>

                {/* Left — image */}
                <div className='w-full lg:w-[420px] rounded-2xl overflow-hidden border border-white/10 shadow-xl shadow-purple-950/20'>
                    <img
                        src={fox_img}
                        alt='For Fox Sake'
                        className='w-full h-full object-cover min-h-[280px] sm:min-h-[340px]'
                    />
                </div>

                {/* Right — text + stats */}
                <div className='flex flex-col gap-6 text-white/80 text-base sm:text-lg leading-relaxed'>
                <p>
                    Beneath the neon spires of the Cronos underworld, a hooded fox
                    runs a tavern that doesn't appear on any map. Inside, a single
                    bottle of mystical sake sits on the bar — glowing, breathing,
                    waiting.
                </p>
                <p>
                    Every degen who steps in pours their $FFS into the bottle. The
                    bottle drinks them in. And at random, without warning, the bottle{' '}
                    <span className='text-purple-400'>
                        spills
                    </span>
                    .
                </p>
                <p>
                    One soul walks out with the entire treasury. The rest? They refill
                    the bottle for the next round. That's the deal. That's the tavern.
                    That's For Fox Sake.
                </p>

                <div className='rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm mt-6'>
                    <p className='text-white text-xl sm:text-2xl font-semibold mb-4'>Rewards, raffles, and side quests</p>
                    <p className='text-white/65 leading-relaxed'>
                        FFS isn’t just about the bottle — it’s about loyalty and community. Holders can earn exclusive $PACK rewards, join weekly CRO raffles, and take part in smaller on-chain activities that keep the tavern alive.
                    </p>
                    <div className='grid gap-4 mt-6 sm:grid-cols-3'>
                        <div className='rounded-2xl border border-white/10 bg-slate-950/70 p-4'>
                            <p className='text-pink-300 uppercase text-xs tracking-[0.3em] mb-3'>HOLDER REWARDS</p>
                            <p className='text-white/80 leading-relaxed text-sm'>
                                Keep $FFS in your wallet and earn periodic $PACK rewards, minted for loyal holders and community contributors.
                            </p>
                        </div>
                        <div className='rounded-2xl border border-white/10 bg-slate-950/70 p-4'>
                            <p className='text-pink-300 uppercase text-xs tracking-[0.3em] mb-3'>WEEKLY CRO RAFFLES</p>
                            <p className='text-white/80 leading-relaxed text-sm'>
                                Every week we raffle CRO prizes to active members — from surprise drops to treasury-backed rewards for on-chain participation.
                            </p>
                        </div>
                        <div className='rounded-2xl border border-white/10 bg-slate-950/70 p-4'>
                            <p className='text-pink-300 uppercase text-xs tracking-[0.3em] mb-3'>SMALL ACTIVITIES</p>
                            <p className='text-white/80 leading-relaxed text-sm'>
                                Mini missions, community quests, badges, and low-cost events keep the tavern buzzing and reward those who show up.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Stat cards */}
                <div className='grid gap-3 mt-4 sm:grid-cols-3'>
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
    </div>
    )
}

export default LoreContent