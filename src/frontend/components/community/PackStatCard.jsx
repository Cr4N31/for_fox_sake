function PackStatCard({ icon, iconColor, value, label, accentClass }) {
  const StatIcon = icon

  return (
    <div className={`relative overflow-hidden rounded-xl bg-gradient-to-br from-transparent to-black/80 border border-white/5 p-5 transition-colors duration-300 hover:border-fuchsia-500/25 ${accentClass}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none" />
      <StatIcon size={20} className={`mb-3 opacity-70 ${iconColor}`} />
      <div className="font-black text-2xl text-white leading-none" style={{ fontFamily: "'Orbitron', monospace" }}>
        {typeof value === "string" && value.includes("$FFS") ? (
          <>{value.replace(" $FFS", "")} <span className="text-base text-fuchsia-400">$FFS</span></>
        ) : value}
      </div>
      <div className="mt-1.5 text-[10px] tracking-[0.2em] uppercase font-semibold text-[#6b6080]"
        style={{ fontFamily: "'Rajdhani', sans-serif" }}>
        {label}
      </div>
    </div>
  );
}
export default PackStatCard
