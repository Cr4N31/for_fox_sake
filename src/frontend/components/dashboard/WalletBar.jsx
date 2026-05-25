import { Bell } from "lucide-react"
import { useAppKitAccount } from "@reown/appkit/react"
import img from "../../../assets/imgs/fox-mascot-D5VOPyRA.jpg"

function WalletBar(){
    const { address, isConnected } = useAppKitAccount()
    return(
        <section className="flex w-full mt-24 items-center justify-between gap-6 text-white border rounded-xl border-purple-800 bg-black/50 px-4 py-4">
                <div className="flex items-center gap-4">
                    <img className="w-10 rounded-xl" src={img} alt="img"/>
                    <span className="text-left flex flex-col gap-1 text-xs text-white/80">
                        <p>Wallet</p>
                        <p>
                            {isConnected
                                ? `${address.slice(0, 6)}...${address.slice(-4)}`
                                : "— not connected —"
                            }
                        </p>
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <button className="flex items-center gap-2 border border-cyan-500/80 bg-black/50 text-white/80 rounded-xl px-2 py-1 text-sm">
                        <div className="animate-pulse w-2 h-2 bg-cyan-500 rounded-full"></div>
                        <p>Cronos</p>
                    </button>
                    <button className="border border-purple-800 bg-black/50 text-white/80 rounded-xl px-2 py-1 text-sm">
                        Balance <span className="bg-neon bg-clip-text text-transparent">0FFS</span>
                    </button>
                    <button className="border border-purple-800 bg-black/50 rounded-xl px-2 py-1">
                        <Bell className="w-4 text-white/80" />
                    </button>
                </div>
        </section>
    )
}

export default WalletBar