export function TreasuryBottleCard({ balance = 0, participants = 0, fillPercent = 0, onPour, isPouring = false, transactionStatus = '', transactionError = '' }) {
    return (
        <div className="flex flex-col gap-4 bg-[#1a0a2e]/80 border border-purple-800/50 rounded-2xl p-5 backdrop-blur-sm">
            
            <div>
                <p className="text-[10px] uppercase tracking-widest text-white/50 mb-1">Treasury Bottle</p>
                <h2 className="text-2xl font-bold bg-fire bg-clip-text text-transparent">
                    {balance.toLocaleString()} <span className="text-xl">$FFS</span>
                </h2>
            </div>

            {/* Fill bar */}
            <div className="w-full h-2 rounded-full bg-white/10">
                <div
                    className="h-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 transition-all duration-700"
                    style={{ width: `${fillPercent}%` }}
                />
            </div>

            <p className="text-white/50 text-sm">
                {fillPercent}% · {participants} participants
            </p>

            {/* Pour button */}
            <button
                onClick={onPour}
                disabled={isPouring}
                className="w-full px-4 py-2 rounded-full font-bold tracking-widest uppercase text-white bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 hover:shadow-[0_0_20px_rgba(217,70,239,0.6)] transition-all duration-300"
            >
                {isPouring ? 'Transaction pending...' : 'Pour 1,000 $FFS'}
            </button>
            {(transactionStatus || transactionError) && (
                <p className={`text-xs ${transactionError ? 'text-red-300' : 'text-yellow-300'}`}>
                    {transactionError || transactionStatus}
                </p>
            )}
        </div>
    )
}

export default TreasuryBottleCard
