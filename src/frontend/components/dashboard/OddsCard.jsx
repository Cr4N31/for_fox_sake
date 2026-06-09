export function OddsCard({ userPours = 0, totalSips = 0, roundNumber = 0 }) {
    return (
        <div className="flex flex-col gap-4 bg-[#1a0a2e]/80 border border-purple-800/50 rounded-2xl p-5 backdrop-blur-sm">
            <p className="text-[10px] uppercase tracking-widest text-white/50 mb-2">Your Odds</p>
            <p className="text-white/50 text-sm">
                {userPours === 0 ? "No pours yet. Your odds appear once you join the round." : `You've made ${userPours} pour${userPours !== 1 ? 's' : ''}.`}
            </p>
            <div className="flex justify-center gap-6 mt-2">
                <div className="flex flex-col items-center gap-1">
                    <span className="text-2xl font-bold text-white">{userPours}</span>
                    <span className="text-[11px] uppercase tracking-widest text-white/40">Pours</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                    <span className="text-2xl font-bold text-cyan-400">{totalSips}</span>
                    <span className="text-[11px] uppercase tracking-widest text-white/40">Sips</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                    <span className="text-2xl font-bold text-orange-400">{roundNumber > 0 ? 'Live' : 'Open'}</span>
                    <span className="text-[11px] uppercase tracking-widest text-white/40">Round</span>
                </div>
            </div>
        </div>
    )
}

export default OddsCard