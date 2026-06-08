import { useState, useMemo } from "react"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"

const generateData = (hours, balance) => {
    const points = hours === "1H" ? 12 : hours === "6H" ? 24 : hours === "24H" ? 48 : 90
    return Array.from({ length: points }, (_, i) => ({
        time: i,
        value: Math.max(0, balance + i * 10),
    }))
}

const ranges = ["1H", "6H", "24H", "7D"]

const CustomTooltip = ({ active, payload }) => {
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
    
    // Use mock holdings if provided, otherwise use default balance display
    const displayHoldings = mockTokenHoldings.length > 0 ? mockTokenHoldings : []
    const totalHoldingsValue = displayHoldings.reduce((sum, h) => sum + h.amount, 0)

    // Generate line chart data from holdings
    const chartData = useMemo(() => {
    return displayHoldings.length > 0
        ? displayHoldings.map((holding) => ({
            name: holding.name,
            value: holding.amount,
            percentage: holding.percentage
        }))
        : generateData(activeRange, balance)
    }, [activeRange, balance, displayHoldings])

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

            {/* Line Chart */}
            <div className="w-full h-40 mt-2">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="holdingLineGrad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#ec4899" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#ec4899" stopOpacity={0.1} />
                            </linearGradient>
                        </defs>
                        <XAxis 
                            dataKey={displayHoldings.length > 0 ? "name" : "time"} 
                            stroke="#ffffff20"
                            style={{ fontSize: "12px" }}
                        />
                        <YAxis 
                            stroke="#ffffff20"
                            style={{ fontSize: "12px" }}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Line
                            type="monotone"
                            dataKey={displayHoldings.length > 0 ? "value" : "value"}
                            stroke="#ec4899"
                            strokeWidth={2.5}
                            dot={{ fill: "#ec4899", r: 4 }}
                            activeDot={{ r: 6, fill: "#ec4899" }}
                            isAnimationActive={false}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default HoldingChart
