import { Users, History } from 'lucide-react'

function StatsGrid({ holders = 0, totalSips = 0 }) {
    const stats = [
        { icon: <Users className='w-4 h-4 text-cyan-400' />, value: holders, label: 'Unique Participants' },
        { icon: <History className='w-4 h-4 text-cyan-400' />, value: totalSips, label: 'Total Sips' },
    ]

    return (
        <div className='grid grid-cols-2 gap-3 py-8'>
            {stats.map((s) => (
                <div key={s.label}
                    className='rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-4 flex flex-col gap-2'>
                    {s.icon}
                    <p className='text-white font-bold text-2xl'>{s.value}</p>
                    <p className='text-white/40 text-xs tracking-widest uppercase'>{s.label}</p>
                </div>
            ))}
        </div>
    )
}

export default StatsGrid