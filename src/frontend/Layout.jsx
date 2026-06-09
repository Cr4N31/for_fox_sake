import Home from "./pages/Home"
import About from "./pages/About"
import Treasury from "./pages/Treasury"
import Dashboard from "./pages/Dashboard"
import Community from "./pages/Community"
import { useAppKitAccount } from "@reown/appkit/react"
import { useAppKit } from "@reown/appkit/react"

const leafConfigs = Array.from({ length: 14 }, (_, index) => {
  const size = 18 + Math.round(Math.random() * 18)
  return {
    id: index,
    left: `${Math.random() * 100}%`,
    delay: `${-Math.random() * 18}s`,
    duration: `${10 + Math.random() * 10}s`,
    rotate: `${Math.round(Math.random() * 360)}deg`,
    scale: 0.8 + Math.random() * 0.6,
    size: `${size}px`,
    opacity: 0.75 + Math.random() * 0.2,
  }
})

function Layout({ currentPage = 'HOME', onNavigate, treasury, holders, totalSips, participants, pours, lastWinner, winnerHistory, fillPercent, onPour, mockTokenHoldings, sipNonce, isPouring, transactionStatus = '', transactionError = '', stats, isApproving, roundNumber},) {
  const { isConnected } = useAppKitAccount()
  const { open } = useAppKit()

  const GuardedPage = ({ children }) => {
    if (!isConnected) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
          <p className="text-white/50 text-sm tracking-widest uppercase">
            Connect your wallet to access this page
          </p>
          <button
            onClick={() => open()}
            className="px-6 py-3 rounded-xl font-bold uppercase tracking-widest text-white text-sm bg-pink-500 shimmer transition-all duration-300 hover:shadow-[0_0_20px_6px_rgba(236,72,153,0.6)]"
          >
            Connect Wallet
          </button>
        </div>
      )
    }
    return children
  }

  return (
    <div className="relative overflow-hidden">
      <div className="falling-leaves pointer-events-none absolute inset-0 -z-10">
        {leafConfigs.map((leaf) => (
          <span
            key={leaf.id}
            className="leaf"
            style={{
              left: leaf.left,
              animationDelay: leaf.delay,
              animationDuration: leaf.duration,
              transform: `rotate(${leaf.rotate}) scale(${leaf.scale})`,
              width: leaf.size,
              height: leaf.size,
              opacity: leaf.opacity,
            }}
          />
        ))}
      </div>

      {currentPage === 'HOME'      && <Home      onNavigate={onNavigate} holders={holders} treasury={treasury} totalSips={totalSips} onPour={onPour} isPouring={isPouring} transactionStatus={transactionStatus} transactionError={transactionError} lastWinner={lastWinner} isApproving={isApproving} />}
      {currentPage === 'ABOUT'     && <About     onNavigate={onNavigate} />}
      {currentPage === 'TREASURY'  && (
        <GuardedPage>
          <Treasury
            onNavigate={onNavigate}
            treasury={treasury}
            holders={holders}
            totalSips={totalSips}
            participants={participants}
            pours={pours}
            lastWinner={lastWinner}
            winnerHistory={winnerHistory}
            fillPercent={fillPercent}
            onPour={onPour}
            sipNonce={sipNonce}
            isPouring={isPouring}
            transactionStatus={transactionStatus}
            transactionError={transactionError}
            isApproving={isApproving}
          />
        </GuardedPage>
      )}
      {currentPage === 'DASHBOARD' && (
        <GuardedPage>
          <Dashboard
            onNavigate={onNavigate}
            balance={treasury}
            fillPercent={fillPercent}
            participants={participants}
            totalSips={totalSips}
            roundNumber={roundNumber}
            pours={pours}
            onPour={onPour}
            isPouring={isPouring}
            transactionStatus={transactionStatus}
            isApproving={isApproving}
            transactionError={transactionError}
          />
        </GuardedPage>
      )}
      {currentPage === 'COMMUNITY' && <Community onNavigate={onNavigate} stats={stats} treasury={treasury} totalSips={totalSips} winnerHistory={winnerHistory} />}
    </div>
  )
}

export default Layout
