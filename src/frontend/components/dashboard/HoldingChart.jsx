function HoldingChart({ balance = 0 }) {
    return (
        <div className="flex flex-col gap-3 bg-[#1a0a2e]/80 border border-purple-800/50 rounded-2xl p-5 backdrop-blur-sm w-full">
            <p className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Your Holdings</p>
            <h2 className="text-3xl font-bold text-pink-500">{balance.toLocaleString()}</h2>
            <p className="text-white/40 text-xs mt-1">$FFS</p>
        </div>
    )
}

export default HoldingChart