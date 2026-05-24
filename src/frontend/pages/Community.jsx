import { GitBranchIcon, XIcon, DiscIcon } from "lucide-react"
import PackHero from "../components/community/PackHero"
import PackStatGrid from "../components/community/PackStatGrid"
import Leaderboard from "../components/community/Leaderboard"
import SideCard from "../components/community/SideCard"

const tavernLinks = [
    { icon: GitBranchIcon, name: 'Docs', handle: 'forfoxsake', href: 'https://github.com/ForFoxSake' },
    { icon: DiscIcon, name: 'Discord', handle: '@ForFoxSake', href: 'https://discord.gg/your-link' },
    { icon: XIcon, name: 'Twitter / X', handle: '@ForFoxSake', href: 'https://twitter.com/ForFoxSake' },
]

function Community(){
	return (
		<section className="max-w-7xl mx-auto mt-16 px-6 pb-24 space-y-8" data-aos="fade-up">
            <PackHero />
            <div data-aos="fade-up">
                <PackStatGrid/>
            </div>
            <div data-aos="fade-up">
                <Leaderboard />
            </div>
            <div data-aos="fade-up">
                <SideCard tavernLinks={tavernLinks} quote="Every sip could drain the bottle…" quoteAttribution="— Tavern Master Kitsune" />
            </div>
		</section>
	)
}

export default Community
