import { Trophy, GlassWater } from 'lucide-react'

function BottleVisual({ fillPercent = 0, treasury = 0, participants = 0, onPour = () => {}, sipNonce = 0, isPouring = false, isApproving = false, transactionStatus = '', transactionError = '' }) {
    const bodyBottom = 200
    const bodyHeight = 135
    const fillHeight = (bodyHeight * fillPercent) / 100
    const fillY = bodyBottom - fillHeight

    const getPourLabel = () => {
        if (isApproving) return 'Approving FFS...'
        if (isPouring) return 'Pending...'
        return 'Pour 1,000 $FFS'
    }

    return (
        <div className='flex flex-col items-center justify-center p-8 gap-4'>
            <div
                key={sipNonce}
                className={`relative w-48 h-80 transition-transform duration-500 ${sipNonce > 0 ? 'sip-burst' : ''}`}
            >
                <svg viewBox='0 0 120 220' className='w-full h-full' xmlns='http://www.w3.org/2000/svg'>
                    <defs>
                        <clipPath id='bodyClip'>
                            <path d='M38 65 Q18 85 18 112 L18 182 Q18 202 60 202 Q102 202 102 182 L102 112 Q102 85 82 65 Z' />
                        </clipPath>
                        <linearGradient id='fillGrad' x1='0' y1='0' x2='0' y2='1'>
                            <stop offset='0%' stopColor='#7dd3fc' stopOpacity='0.95' />
                            <stop offset='50%' stopColor='#60a5fa' stopOpacity='1' />
                            <stop offset='100%' stopColor='#818cf8' stopOpacity='1' />
                        </linearGradient>
                        <linearGradient id='waveGrad' x1='0' y1='0' x2='0' y2='1'>
                            <stop offset='0%' stopColor='#e0f2fe' stopOpacity='0.8' />
                            <stop offset='100%' stopColor='#7dd3fc' stopOpacity='0' />
                        </linearGradient>
                    </defs>

                    <rect x='48' y='10' width='24' height='18' rx='3'
                        fill='none' stroke='#d946ef' strokeWidth='1.2' />
                    <rect x='42' y='13' width='36' height='11' rx='2'
                        fill='#1e0a3c' stroke='#d946ef' strokeWidth='1' />
                    <text x='60' y='21.5' textAnchor='middle' fill='#d946ef'
                        fontSize='5.5' fontWeight='bold'>$FFS</text>
                    <path
                        d='M48 28 L42 65 Q20 85 20 112 L20 182 Q20 202 60 202 Q100 202 100 182 L100 112 Q100 85 78 65 L72 28'
                        fill='none' stroke='#d946ef' strokeWidth='1.2'
                    />
                    <line x1='48' y1='28' x2='48' y2='10' stroke='#d946ef' strokeWidth='1.2' />
                    <line x1='72' y1='28' x2='72' y2='10' stroke='#d946ef' strokeWidth='1.2' />
                    <rect
                        x='18' y={fillY}
                        width='84' height={fillHeight + 10}
                        fill='url(#fillGrad)'
                        clipPath='url(#bodyClip)'
                        style={{ transition: 'y 1.2s ease-in-out, height 1.2s ease-in-out' }}
                    />
                    {fillPercent > 0 && (
                        <rect
                            x='18' y={fillY}
                            width='84' height='12'
                            fill='url(#waveGrad)'
                            clipPath='url(#bodyClip)'
                            style={{ transition: 'y 1.2s ease-in-out' }}
                        />
                    )}
                    <rect x='38' y='118' width='44' height='44' rx='3'
                        fill='#1e0a3c' stroke='#d946ef' strokeWidth='1' fillOpacity='0.85' />
                    <text x='60' y='138' textAnchor='middle' fill='#d946ef' fontSize='14' fontWeight='bold'>狐</text>
                    <text x='60' y='154' textAnchor='middle' fill='#d946ef' fontSize='6' letterSpacing='2'>SAKE</text>
                </svg>
            </div>

            <div className='text-center w-full max-w-xs'>
                <p className='text-white/40 text-xs tracking-widest uppercase'>Current Treasury</p>
                <h2 className='text-5xl font-extrabold bg-fire bg-clip-text text-transparent mt-1'>
                    {treasury.toLocaleString()} $FFS
                </h2>
                <div className='mt-3 h-1.5 w-full rounded-full bg-white/10 overflow-hidden'>
                    <div
                        className='h-full rounded-full bg-gradient-to-r from-pink-500 to-cyan-400'
                        style={{ width: `${fillPercent}%`, transition: 'width 1.2s ease-in-out' }}
                    />
                </div>
                <p className='text-white/40 text-xs mt-2'>
                    Bottle {fillPercent}% full · {participants} participants
                </p>
            </div>

            {fillPercent === 0 && (
                <p className='text-orange-500/70 text-xs tracking-[0.2em] uppercase'>
                    — Bottle is empty. Be the first to pour. —
                </p>
            )}

            <div className='flex gap-3 mt-2'>
                <button
                    type='button'
                    onClick={onPour}
                    disabled={isPouring || isApproving}
                    className='flex items-center gap-2 px-5 py-3 rounded-xl
                               bg-pink-500 shimmer text-white text-sm font-bold uppercase tracking-wide
                               transition-all duration-300
                               hover:shadow-[0_0_20px_6px_rgba(236,72,153,0.6)] disabled:cursor-not-allowed disabled:opacity-50'>
                    <GlassWater className='w-4 h-4' />
                    {getPourLabel()}
                </button>
                <button className='flex items-center gap-2 px-5 py-3 rounded-xl
                                   border border-white/20 bg-white/5 text-white/70
                                   text-sm font-bold uppercase tracking-wide
                                   hover:bg-white/10 transition-all duration-150'>
                    <Trophy className='w-4 h-4' />
                    Winners
                </button>
            </div>

            {(transactionStatus || transactionError) && (
                <p className={`text-xs mt-1 ${transactionError ? 'text-red-300' : 'text-yellow-300'}`}>
                    {transactionError || transactionStatus}
                </p>
            )}
        </div>
    )
}

export default BottleVisual