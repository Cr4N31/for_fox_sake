export function OddsCard({ totalSips = 0 }) {
    const stats = [
        { label: "Pours", value: totalSips, color: "text-white" },
        { label: "Sips", value: totalSips, color: "text-cyan-400" },
        { label: "Round", value: totalSips > 0 ? "Live" : "Open", color: "text-orange-400" },
    ]

    return (
        <div className="flex flex-col gap-4 bg-[#1a0a2e]/80 border border-purple-800/50 rounded-2xl p-5 backdrop-blur-sm">

            <div>
                <p className="text-[10px] uppercase tracking-widest text-white/50 mb-2">Your Odds</p>
                <div className="w-8 h-[2px] bg-pink-500 mb-4" />
            </div>

            <p className="text-white/50 text-sm">
                {totalSips === 0 ? "No pours yet. Your odds appear once you join the round." : `You've made ${totalSips} pour${totalSips !== 1 ? 's' : ''}.`}
            </p>

            {/* Stats row */}
            <div className="flex justify-center gap-6 mt-2">
                {stats.map((s) => (
                    <div key={s.label} className="flex flex-col items-center gap-1">
                        <span className={`text-2xl font-bold ${s.color}`}>
                            {s.value}
                        </span>
                        <span className="text-[11px] uppercase tracking-widest text-white/40">
                            {s.label}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default OddsCard
