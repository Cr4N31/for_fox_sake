import { Trophy } from "lucide-react"

function Leaderboard({ entries = [], filter = "All time" }) {
    return (
        <div className="rounded-2xl bg-gradient-to-br from-transparent to-black/80 border border-white/5 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
                <div className="font-bold text-sm tracking-widest">
                    <span className="bg-fire bg-clip-text text-transparent tracking-widest">LEADERBOARD</span>
                </div>
                <div className="text-sm text-[#6b6080]">{filter}</div>
            </div>

            {entries.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 gap-3">
                    <Trophy size={48} className="opacity-20 text-[#6b6080]" />
                    <p className="text-cyan-200">No winners yet.</p>
                    <p className="text-[10px] tracking-[0.3em] text-cyan-200 opacity-60">
                        — AWAITING THE FIRST SIP —
                    </p>
                </div>
            ) : (
                <ul className="px-5 py-3 max-h-96 overflow-y-auto">
                    {entries.map((entry, i) => (
                        <li key={entry.transaction_hash || i}
                            className="py-3 border-b border-white/5 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <span className={`text-xs font-bold w-6 text-center
                                    ${i === 0 ? 'text-amber-400' :
                                      i === 1 ? 'text-slate-300' :
                                      i === 2 ? 'text-orange-400' : 'text-white/30'}`}>
                                    #{i + 1}
                                </span>
                                <div>
                                    <p className="text-white/80 font-mono text-sm">
                                        {entry.shortWinner || entry.winner_address}
                                    </p>
                                    <p className="text-white/30 text-[10px] uppercase tracking-widest">
                                        Round {entry.round_number}
                                    </p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-pink-300 font-bold text-sm">
                                    {(entry.winnerAmount || entry.amount_won || 0).toLocaleString()} $FFS
                                </p>
                                <p className="text-white/30 text-[10px]">
                                    {entry.won_at ? new Date(entry.won_at).toLocaleDateString() : ''}
                                </p>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default Leaderboard