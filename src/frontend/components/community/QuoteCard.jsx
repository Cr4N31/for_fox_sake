function QuoteCard({ quote = '"Every sip could drain the bottle…"', attribution = "— Tavern Master Kitsune" }) {
  return (
    <div className="rounded-2xl bg-black/60 border border-white/5 p-6 text-center">
      <p className="italic text-base text-amber-400 leading-relaxed" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
        {quote}
      </p>
      <p className="mt-2.5 text-xs text-cyan-200">{attribution}</p>
    </div>
  );
}

export default QuoteCard