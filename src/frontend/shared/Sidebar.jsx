import { useState } from 'react'
import fox_img from '../../assets/imgs/fox-mascot-D5VOPyRA.jpg'

function Sidebar({ isOpen, onClose, onNavigate }) {
    const [active, setActive] = useState('HOME')

    const links = [
        { id: '01', label: 'HOME' },
        { id: '02', label: 'ABOUT' },
        { id: '03', label: 'TREASURY' },
        { id: '04', label: 'DASHBOARD' },
        { id: '05', label: 'COMMUNITY' },
    ]

    return (
        <>
            {/* Backdrop */}
            {isOpen && (
                <div 
                    className='fixed inset-0 bg-black/50 z-50'
                    onClick={onClose}
                />
            )}

            {/* Sidebar panel */}
            <div className={`fixed inset-0 h-full w-full z-60 
                            bg-[#0d0718]
                            transition-transform duration-300 ease-in-out
                            ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>

                {/* Fox image — right half bg */}
                <div className='absolute right-0 top-0 h-full w-[55%] overflow-hidden'>
                    <img 
                        src={fox_img} 
                        alt='fox' 
                        className='w-full h-full object-cover object-top opacity-60'
                    />
                    <div className='absolute inset-0 bg-gradient-to-r from-[#0d0718] via-[#0d0718]/60 to-transparent' />
                </div>

                {/* Nav links */}
                <nav className='relative top-20 z-10 flex flex-col px-8 pt-12 gap-1'>
                    <p className='text-cyan-300 text-xs tracking-[0.3em] uppercase mb-6'>
                        — Enter the Tavern
                    </p>
                    {links.map((link) => (
                        <button
                            key={link.id}
                            onClick={() => {
                                setActive(link.label)
                                if (onNavigate) onNavigate(link.label)
                                onClose()
                            }}
                            className='flex items-baseline gap-4 group text-left w-fit'
                        >
                            <span className='text-white/30 text-xs w-5'>{link.id}</span>
                            <span className={`font-extrabold text-5xl uppercase leading-tight
                                             transition-all duration-150
                                             ${active === link.label 
                                                ? 'bg-fire bg-clip-text text-transparent' 
                                                : 'text-white/20 group-hover:text-white/50'}`}>
                                {link.label}
                            </span>
                        </button>
                    ))}
                </nav>

                {/* Bottom status */}
                <div className='absolute bottom-6 left-8 z-10 flex items-center gap-2'>
                    <div className='w-2 h-2 rounded-full bg-cyan-400 animate-pulse' />
                    <p className='text-white/40 text-xs tracking-widest uppercase'>
                        $FFS · Cronos Network · Sip. Stake. Win.
                    </p>
                </div>
            </div>
        </>
    )
}

export default Sidebar

