import { GitBranchIcon, XIcon, DiscIcon } from "lucide-react"
import PackHero from "../components/community/PackHero"
import PackStatGrid from "../components/community/PackStatGrid"
import Leaderboard from "../components/community/Leaderboard"
import SideCard from "../components/community/SideCard"

const tavernLinks = [
    { icon: DiscIcon, name: 'Discord', handle: '@ForFoxSake', href: 'https://discord.gg/VrZe6uk6Qt' },
    { icon: XIcon, name: 'Twitter / X', handle: '@ForFoxSake', href: 'https://x.com/ForFoxSakeCro' },
]

function Community({ stats = {}, treasury = 0, totalSips = 0, winnerHistory = [] }){
	return (
		<section className="max-w-7xl mx-auto mt-16 px-6 pb-24 space-y-8" data-aos="fade-up" id="community">
            <PackHero />
            <div data-aos="fade-up">
                <PackStatGrid
                    holders={stats.total_participants ?? 0}
                    treasury={`${treasury.toLocaleString()} $FFS`}
                    rewards={`${(stats.total_ffs_distributed ?? 0).toLocaleString()} $FFS`}
                    sips={totalSips}

                />
            </div>
            <div data-aos="fade-up">
                <Leaderboard entries={winnerHistory}/>
            </div>
            <div data-aos="fade-up">
                <SideCard tavernLinks={tavernLinks} quote="Every sip could drain the bottle…" quoteAttribution="— Tavern Master Kitsune" />
            </div>
		</section>
	)
}

export default Community
