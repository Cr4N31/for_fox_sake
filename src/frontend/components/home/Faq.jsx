import { Sparkles, Coins, Zap } from 'lucide-react'

function Faq(){
    const faq = [
        { 
            icon: <Sparkles className="size-6 text-white" />, 
            iconBg: "bg-gradient-to-br from-pink-500 to-purple-600",
            alt: "for_fox_sake", 
            question: "What is For Fox Sake?", 
            desc: "A Cronos-native protocol where holders pour $FFS into a shared sake bottle, fueling a high-stakes treasury game."
        },
        { 
            icon: <Coins className="size-6 text-white" />, 
            iconBg: "bg-gradient-to-br from-teal-400 to-cyan-600",
            alt: "treasury", 
            question: "How the Treasury Works", 
            desc: "Every pour adds to the bottle. At random intervals the bottle sips — one degen takes the spoils, the rest fuels the next round."
        },
        { 
            icon: <Zap className="size-6 text-white" />, 
            iconBg: "bg-gradient-to-br from-orange-400 to-amber-600",
            alt: "crono", 
            question: "Built on Cronos", 
            desc: "Lightning fast, low fees, fully on-chain. The fox syndicate runs on Cronos rails for transparent, verifiable chaos."
        }
    ]

    return(
        <section className="px-6 py-12">
            <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 list-none p-0 m-0">
                {faq.map((f) => (
                    <li 
                        key={f.alt}
                        className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
                    >
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${f.iconBg}`}>
                            {f.icon}
                        </div>
                        <h3 className="text-white font-semibold text-lg m-0">{f.question}</h3>
                        <p className="text-gray-400 text-sm leading-relaxed m-0">{f.desc}</p>
                    </li>
                ))}
            </ul>
        </section>
    )
}

export default Faq