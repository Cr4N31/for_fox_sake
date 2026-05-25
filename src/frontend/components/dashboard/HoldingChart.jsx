import { useState } from "react"
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"

const generateData = (hours) => {
    const points = hours === "1H" ? 12 : hours === "6H" ? 24 : hours === "24H" ? 48 : 90
    return Array.from({ length: points }, (_, i) => ({
        time: i,
        value: Math.max(0, Math.random() * 200 - 100 + (i * 0.5)),
    }))
}

const ranges = ["1H", "6H", "24H", "7D"]

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-[#2a0a3e] border border-purple-700/50 rounded-lg px-3 py-2 text-xs">
                <p className="text-cyan-400 font-bold">{payload[0].payload.time}h</p>
                <p className="text-white/70">v : {payload[0].value.toFixed(0)}</p>
            </div>
        )
    }
    return null
}

function HoldingChart({ balance = 0, usdValue = 0.00, mockTokenHoldings = [] }) {
    const [activeRange, setActiveRange] = useState("24H")
    const [data] = useState(() => generateData("24H"))
    
    // Use mock holdings if provided, otherwise use default balance display
    const displayHoldings = mockTokenHoldings.length > 0 ? mockTokenHoldings : []
    const totalHoldingsValue = displayHoldings.reduce((sum, h) => sum + h.amount, 0)

    return (
        <div className="flex flex-col gap-3 bg-[#1a0a2e]/80 border border-purple-800/50 rounded-2xl p-5 backdrop-blur-sm w-full">

            {/* Header */}
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-[10px] uppercase tracking-widest text-white/40 mb-1">
                        Your Holdings
                    </p>
                    <h2 className="text-3xl font-bold text-pink-500">
                        {displayHoldings.length > 0 ? totalHoldingsValue.toLocaleString() : balance.toLocaleString()}
                    </h2>
                    <p className="text-white/40 text-xs mt-1">
                        $FFS · ≈ ${(displayHoldings.length > 0 ? totalHoldingsValue * 0.0012 : usdValue).toFixed(2)} USD
                    </p>
                </div>

                {/* Range selectors */}
                <div className="flex gap-2 items-center">
                    {ranges.map((r) => (
                        <button
                            key={r}
                            onClick={() => setActiveRange(r)}
                            className={`text-[11px] tracking-widest transition-all duration-200 px-1 ${
                                activeRange === r
                                    ? "text-cyan-400 border-b border-cyan-400"
                                    : "text-white/30 hover:text-white/60"
                            }`}
                        >
                            {r}
                        </button>
                    ))}
                </div>
            </div>

            {/* Show token holdings breakdown if available */}
            {displayHoldings.length > 0 ? (
                <div className="w-full mt-3 space-y-2 max-h-48 overflow-y-auto">
                    {displayHoldings.map((holding) => (
                        <div key={holding.id} className="flex items-center justify-between bg-white/5 p-3 rounded-lg">
                            <div className="flex items-center gap-3 flex-1">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center text-xs font-bold text-white">
                                    {holding.name.charAt(6)}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-white text-sm font-semibold truncate">{holding.name}</p>
                                    <p className="text-white/40 text-xs">{holding.percentage}% of portfolio</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-cyan-400 text-sm font-semibold">{holding.amount.toLocaleString()}</p>
                                <p className="text-white/40 text-xs">${(holding.amount * 0.0012).toFixed(2)}</p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <>
                    {/* Chart - shown when no holdings to display */}
                    <div className="w-full h-40 mt-2">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="holdingGrad" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#ec4899" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#ec4899" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="time" hide />
                                <YAxis hide />
                                <Tooltip content={<CustomTooltip />} />
                                <Area
                                    type="monotone"
                                    dataKey="value"
                                    stroke="#ec4899"
                                    strokeWidth={1.5}
                                    fill="url(#holdingGrad)"
                                    dot={false}
                                    activeDot={{
                                        r: 4,
                                        fill: "#ec4899",
                                        stroke: "#1a0a2e",
                                        strokeWidth: 2,
                                    }}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </>
            )}
        </div>
    )
}

export default HoldingChart