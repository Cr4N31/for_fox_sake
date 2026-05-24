import SocialLink from "./SocialLinks"
function TavernCard({ links = [] }) {
  return (
    <div className="rounded-2xl bg-black/60 border border-white/5 overflow-hidden">
      <div className="px-5 py-4 border-b border-white/5 text-xs font-bold tracking-widest text-white/80"
        style={{ fontFamily: "'Orbitron', monospace" }}>
        JOIN THE TAVERN
      </div>
      <div className="p-3 flex flex-col gap-1.5">
        {links.map((l) => <SocialLink key={l.name} {...l} />)}
      </div>
    </div>
  );
}

export default TavernCard