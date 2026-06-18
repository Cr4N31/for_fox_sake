import left_img from '../../../assets/imgs/fox-hero-D8H5Gfnq.jpg'
import { useAppKit, useAppKitAccount } from '@reown/appkit/react'

function Hero({ pour, onNavigate, holders = 0, treasury = 0, totalSips = 0 }) {
    const tokenData = [
        { name: `Unique Participants`, value: holders, color: "#ffffff" },
        { name: "Treasury", value: `$${treasury.toLocaleString()}`, color: "#00FFFF" },
        { name: "Spills", value: totalSips, color: '#f87e0c' }
    ]

    const { open } = useAppKit()
    const { address, isConnected } = useAppKitAccount()

    return (
        <section className="my-30 bg-cover gap-2 md:my-18 flex md:flex-row flex-col md:p-16 p-4 justify-between items-center">
            <div className="flex flex-col gap-4 items-left justify-left">
                <span className="flex bg-black/70 border-pink-400 items-center gap-2 border w-fit px-3 py-[4px] rounded-full">
                    <div className="animate-pulse shadow-[0_0_20px_rgba(192,132,252,0.9)] bg-cyan-300 w-2 h-2 rounded-full"></div>
                    <p className="font-semibold text-white">$FFS ON CRONOS</p>
                </span>

                <div className='flex gap-2 flex-col'>
                    <h1 className="font-extrabold text-6xl uppercase bg-fire bg-clip-text text-transparent">
                        For Fox <br /><span className='bg-neon bg-clip-text text-transparent'>Sake</span>
                    </h1>
                    <h2 className="tracking-widest text-2xl text-cyan-300">SPILL. STAKE. WIN</h2>
                    <h3 className='text-white/70'>
                        Enter the neon fox tavern. Pour your $FFS into the mystical sake bottle. <br />
                        When the bottle sips, fate decides who walks away with the treasury.
                    </h3>
                    <span className="text-orange-600 italic">"Every spill could drain the bottle…"</span>
                </div>

                <div className='flex gap-4 text-center justify-left items-center'>
                    {/* CONNECT / ADDRESS BUTTON */}
                    <button
                        onClick={() => open()}
                        className='flex gap-2 rounded-xl bg-pink-500 p-3 text-white shimmer transition-all duration-250 hover:shadow-[0_0_20px_6px_rgba(236,72,153,0.6)]'
                    >
                        <svg
                            viewBox="0 0 24 24"
                            className="w-5"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            stroke="#ffffff"
                        >
                            <g id="SVGRepo_iconCarrier">
                                <path
                                    d="M18 8V7.2C18 6.0799 18 5.51984 17.782 5.09202C17.5903 4.71569 17.2843 4.40973 16.908 4.21799C16.4802 4 15.9201 4 14.8 4H6.2C5.07989 4 4.51984 4 4.09202 4.21799C3.71569 4.40973 3.40973 4.71569 3.21799 5.09202C3 5.51984 3 6.0799 3 7.2V8M21 12H19C17.8954 12 17 12.8954 17 14C17 15.1046 17.8954 16 19 16H21M3 8V16.8C3 17.9201 3 18.4802 3.21799 18.908C3.40973 19.2843 3.71569 19.5903 4.09202 19.782C4.51984 20 5.07989 20 6.2 20H17.8C18.9201 20 19.4802 20 19.908 19.782C20.2843 19.5903 20.5903 19.2843 20.782 18.908C21 18.4802 21 17.9201 21 16.8V11.2C21 10.0799 21 9.51984 20.782 9.09202C20.5903 8.71569 20.2843 8.40973 19.908 8.21799C19.4802 8 18.9201 8 17.8 8H3Z"
                                    stroke="#ffffff"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </g>
                        </svg>
                        <span>
                            {isConnected
                                ? `${address.slice(0, 6)}...${address.slice(-4)}`
                                : 'Connect Wallet'
                            }
                        </span>
                    </button>

                    {/* ENTER TAVERN BUTTON */}
                    <button
                        onClick={() => onNavigate('TREASURY')}
                        className='bg-black/50 hover:bg-cyan-900/90 transition-all duration-150 uppercase text-white/80 p-3 tracking-wide rounded-2xl border border-cyan-300'
                    >
                        Enter Tavern &rarr;
                    </button>
                </div>

                <ul className='flex gap-8 text-center justify-left items-center'>
                    {tokenData.map((t) => (
                        <li key={t.name}>
                            <h2
                                className="font-semibold text-2xl"
                                style={{ color: t.color }}
                            >
                                {t.value}
                            </h2>
                            <p className='uppercase whitespace text- text-white/80'>{t.name}</p>
                        </li>
                    ))}
                </ul>
                {pour === 0 ? (
                    <span className='mb-6 tracking-widest font-light text-white/70'>── Awaiting first pour. Bottle is empty. ──</span>
                ) : (
                    <span className='mb-6 tracking-widest font-light text-white/70'>── Pour has started. Awaiting sip. ──</span>
                )}
                
            </div>

            {/* FOX IMAGE CARD */}
            <div
                className="relative rounded-2xl overflow-hidden border border-orange-500/30 bg-[#1a0a2e]"
                style={{
                    width: '420px',
                    height: '480px',
                    animation: 'floatUpDown 3s ease-in-out infinite',
                    boxShadow: '0 0 20px 6px rgba(255, 63, 169, 0.78)',
                }}
            >
                <style>{`
                    @keyframes floatUpDown {
                        0%   { transform: translateY(0px); }
                        50%  { transform: translateY(-10px); }
                        100% { transform: translateY(0px); }
                    }
                `}</style>

                <div className="absolute top-3 right-3 w-2.5 h-2.5 rounded-full bg-orange-400 z-10" />

                <img
                    className="w-full h-full object-cover"
                    src={left_img}
                    alt="Finchy the Tavern Master"
                />

                {/* UPDATED — Kitsune Genesis → Finchy */}
                <div className="absolute bottom-0 left-0 right-0 px-4 py-3
                                bg-gradient-to-t from-black/90 to-transparent
                                flex items-center justify-between">
                    <div>
                        <p className="text-[10px] uppercase tracking-widest text-gray-300 mb-0.5">
                            The Tavern Master
                        </p>
                        <p className="text-orange-400 font-semibold text-sm">
                            Finchy
                        </p>
                    </div>
                    <span className="text-orange-400 text-lg">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="size-5 text-orange-400"
                            aria-hidden="true"
                        >
                            <path d="M12 3q1 4 4 6.5t3 5.5a1 1 0 0 1-14 0 5 5 0 0 1 1-3 1 1 0 0 0 5 0c0-2-1.5-3-1.5-5q0-2 2.5-4" />
                        </svg>
                    </span>
                </div>
            </div>
        </section>
    )
}

export default Hero