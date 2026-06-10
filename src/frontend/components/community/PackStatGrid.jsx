import { Link2, MessageCircle, Trophy, User } from "lucide-react"
import PackStatCard from "./PackStatCard"
function PackStatGrid({ holders, treasury, rewards, sips}) {
  const stats = [
    { icon: User,         iconColor: "text-violet-400", value: holders,  label: "Total Participants",  accentClass: "" },
    { icon: Link2,         iconColor: "text-cyan-400",   value: treasury, label: "Treasury Size",  accentClass: "border-t-2 border-t-cyan-400" },
    { icon: Trophy,        iconColor: "text-amber-400",  value: rewards,  label: "Total Rewards",  accentClass: "border-t-2 border-t-amber-400" },
    { icon: MessageCircle, iconColor: "text-fuchsia-400",value: sips,     label: "Total Sips",     accentClass: "border-t-2 border-t-fuchsia-400" },
  ];
  return (
    <section className="grid grid-cols-2 md:grid-cols-4 gap-3 px-7 py-6">
      {stats.map((s) => <PackStatCard key={s.label} {...s} />)}
    </section>
  );
}

export default PackStatGrid
