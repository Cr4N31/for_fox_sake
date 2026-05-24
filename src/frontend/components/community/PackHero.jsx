function PackHero({ title = "THE PACK", subtitle = "SYNDICATE OF THE FOX" }) {
  return (
    <section className="px-7 pt-9 pb-3">
      <h1 className="font-black text-6xl md:text-8xl leading-none tracking-widest text-fuchsia-400 drop-shadow-[0_0_40px_rgba(224,64,251,0.4)]"
        style={{ fontFamily: "'Orbitron', monospace" }}>
        {title}
      </h1>
      <p className="mt-2 text-sm tracking-[0.3em] font-semibold text-cyan-400"
        style={{ fontFamily: "'Rajdhani', sans-serif" }}>
        {subtitle}
      </p>
    </section>
  );
}
export default PackHero