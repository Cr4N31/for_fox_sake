import { Trophy } from "lucide-react"
function Leaderboard({ entries = [], filter = "All time" }) {
  return (
    <div className="rounded-2xl bg-gradient-to-br from-transparent to-black/80 border border-white/5 overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
        <div className="font-bold text-sm tracking-widest">
          <span className="bg-fire bg-clip-text text-transparent tracking-widest">LEADERBOARD</span>
          
        </div>
        <div className="text-sm text-[#6b6080]" style={{ fontFamily: "'Rajdhani', sans-serif" }}>{filter}</div>
      </div>
      {entries.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <Trophy size={48} className="opacity-20 text-[#6b6080]" />
          <p className="text-cyan-200" style={{ fontFamily: "'Rajdhani', sans-serif" }}>No winners yet.</p>
          <p className="text-[10px] tracking-[0.3em] text-cyan-200 opacity-60"
            style={{ fontFamily: "'Rajdhani', sans-serif" }}>
            — AWAITING THE FIRST SIP —
          </p>
        </div>
      ) : (
        <ul className="px-5 py-3">
          {entries.map((e, i) => (
            <li key={i} className="py-2 border-b border-white/5 text-[#e0d8f0] text-sm">
              #{i + 1} {e.address} — {e.sips} sips
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
export default Leaderboard