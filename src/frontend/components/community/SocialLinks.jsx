import { Link, XIcon, DiscIcon } from "lucide-react"
function SocialLinks({ icon: Icon, name, handle, href = "#" }) {
  return (
    <a href={href} target="_blank" rel="noreferrer"
      className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/5 no-underline transition-all duration-200 hover:bg-fuchsia-500/[0.08] hover:border-fuchsia-500/20">
      <div className="w-8 h-8 rounded-lg bg-white/[0.06] flex items-center justify-center shrink-0">
        {Icon ? (
          <Icon size={15} className="text-[#e0d8f0]" />
        ) : (
          <div className="w-4 h-4 rounded bg-white/20" />
        )}
      </div>
      <div>
        <div className="text-sm font-semibold text-white" style={{ fontFamily: "'Rajdhani', sans-serif" }}>{name}</div>
        <div className="text-[11px] text-[#6b6080]">{handle}</div>
      </div>
    </a>
  );
}

export default SocialLinks
