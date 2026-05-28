import { useAppKit, useAppKitAccount } from '@reown/appkit/react'
import { useState } from 'react'

function Header({ isOpen, onMenuClick, currentPage = 'HOME', playing, onToggleMusic, audioRef }) {
    const { open } = useAppKit()
    const { address, isConnected } = useAppKitAccount()
    const [showSlider, setShowSlider] = useState(false)
    const [volume, setVolume] = useState(80)

    const handleVolumeChange = (e) => {
        const val = Number(e.target.value)
        setVolume(val)
        if (audioRef?.current) {
            audioRef.current.volume = val / 100
        }
    }

    return (
        <header className="fixed top-2 left-1/2 -translate-x-1/2 bg-black/30 px-3 py-2 rounded-xl border-2 border-purple-300/40 backdrop-blur-md w-[95%] max-w-6xl flex justify-between items-center z-50 shadow-[0_0_25px_rgba(168,85,247,0.2)]">

            {/* LEFT */}
            <div className="flex gap-2 items-center">
                <div className="bg-gradient-to-br from-pink-400 via-purple-400 to-purple-600 rounded-full p-1.5 sm:p-2 shadow-[0_0_20px_rgba(192,132,252,0.9)] hover:scale-110 transition duration-300">
                    <h1 className="font-bold text-white text-xs sm:text-base">FFS</h1>
                </div>
                <div>
                    <p className="bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent tracking-wider font-bold text-sm sm:text-xl drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]">
                        For Fox Sake
                    </p>
                    <p className="text-white/60 uppercase tracking-[0.25em] sm:tracking-[0.35em] text-[9px] sm:text-xs mt-0.5 hidden xs:block">
                        {currentPage}
                    </p>
                </div>
            </div>

            {/* RIGHT */}
            <div className="flex items-center gap-2 sm:gap-3">

                {/* CONNECT BUTTON */}
                <button
                    onClick={() => open()}
                    aria-label="Connect wallet"
                    className="flex items-center px-2 sm:px-4 py-1.5 sm:py-2 rounded-xl text-white bg-gradient-to-r from-pink-400 via-purple-400 to-pink-600 gap-1.5 sm:gap-2 shadow-[0_0_20px_rgba(217,70,239,0.7)] hover:shadow-[0_0_30px_rgba(217,70,239,1)] hover:scale-105 transition duration-300"
                >
                    <svg viewBox="0 0 24 24" className="w-4 sm:w-5 shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff">
                        <g id="SVGRepo_iconCarrier">
                            <path d="M18 8V7.2C18 6.0799 18 5.51984 17.782 5.09202C17.5903 4.71569 17.2843 4.40973 16.908 4.21799C16.4802 4 15.9201 4 4.09202 4.21799C3.71569 4.40973 3.40973 4.71569 3.21799 5.09202C3 5.51984 3 6.0799 3 7.2V8M21 12H19C17.8954 12 17 12.8954 17 14C17 15.1046 17.8954 16 19 16H21M3 8V16.8C3 17.9201 3 18.4802 3.21799 18.908C3.40973 19.2843 3.71569 19.5903 4.09202 19.782C4.51984 20 5.07989 20 6.2 20H17.8C18.9201 20 19.4802 20 19.908 19.782C20.2843 19.5903 20.5903 19.2843 20.782 18.908C21 18.4802 21 17.9201 21 16.8V11.2C21 10.0799 21 9.51984 20.782 9.09202C20.5903 8.71569 20.2843 8.40973 19.908 8.21799C19.4802 8 18.9201 8 17.8 8H3Z" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </g>
                    </svg>
                    <span className="font-semibold text-xs sm:text-sm whitespace-nowrap">
                        {isConnected ? `${address.slice(0, 4)}...${address.slice(-3)}` : 'Connect'}
                    </span>
                </button>

                {/* MUSIC CONTROL */}
                <div
                    className="relative flex items-center"
                    onMouseEnter={() => setShowSlider(true)}
                    onMouseLeave={() => setShowSlider(false)}
                >
                    {/* volume slider — appears on hover */}
                    <div className={`
                        absolute right-12 flex items-center gap-2 bg-black/80 border border-purple-400/50
                        rounded-full px-3 py-1.5 transition-all duration-300 whitespace-nowrap
                        ${showSlider ? 'opacity-100 translate-x-0 pointer-events-auto' : 'opacity-0 translate-x-4 pointer-events-none'}
                    `}>
                        <span className="text-white/50 text-xs">🔈</span>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={volume}
                            onChange={handleVolumeChange}
                            className="w-20 sm:w-24 h-1 accent-purple-400 cursor-pointer"
                        />
                        <span className="text-white/50 text-xs">🔔</span>
                        <span className="text-purple-300 text-xs font-mono w-6 text-right">{volume}</span>
                    </div>

                    {/* mute/unmute button */}
                    <button
                        onClick={onToggleMusic}
                        title={playing ? 'Mute music' : 'Play music'}
                        className="flex items-center justify-center border border-purple-400/50 bg-black/80 w-8 h-8 sm:w-10 sm:h-10 rounded-full shadow-[0_0_15px_rgba(168,85,247,0.5)] hover:shadow-[0_0_25px_rgba(168,85,247,0.9)] hover:scale-110 transition duration-300 text-sm sm:text-base"
                    >
                        {volume === 0 || !playing ? '🔇' : volume < 50 ? '🔉' : '🔊'}
                    </button>
                </div>

                {/* MENU BUTTON */}
                <button
                    className="flex flex-col border border-cyan-300/50 bg-black/80 p-2 sm:p-[13px] rounded-full gap-[3px] sm:gap-1 shadow-[0_0_15px_rgba(34,211,238,0.5)] hover:shadow-[0_0_25px_rgba(34,211,238,0.9)] hover:scale-110 transition duration-300"
                    onClick={onMenuClick}
                    aria-expanded={isOpen}
                    aria-label={isOpen ? 'Close sidebar' : 'Open sidebar'}
                >
                    <span className={`h-[2px] w-3 sm:w-4 rounded-full bg-cyan-300 transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-[5px] sm:translate-y-[6px]' : ''}`} />
                    <span className={`h-[2px] w-3 sm:w-4 rounded-full bg-cyan-300 transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`} />
                    <span className={`h-[2px] w-3 sm:w-4 rounded-full bg-cyan-300 transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-[5px] sm:-translate-y-[6px]' : ''}`} />
                </button>

            </div>
        </header>
    )
}

export default Header