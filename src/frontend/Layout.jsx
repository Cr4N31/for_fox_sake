import Home from "./pages/Home"
import About from "./pages/About"
import Treasury from "./pages/Treasury"
import Dashboard from "./pages/Dashboard"
import Community from "./pages/Community"
import { useAppKitAccount } from "@reown/appkit/react"
import { useAppKit } from "@reown/appkit/react"

function Layout({ currentPage = 'HOME', onNavigate, treasury, holders, totalSips, participants, pours, lastWinner, winnerHistory, fillPercent, onPour, mockTokenHoldings, sipNonce, isPouring, stats }) {
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
    <>
      {currentPage === 'HOME'      && <Home      onNavigate={onNavigate} holders={holders} treasury={treasury} totalSips={totalSips} onPour={onPour} isPouring={isPouring} lastWinner={lastWinner} />}
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
            mockTokenHoldings={mockTokenHoldings}
            onPour={onPour}
            isPouring={isPouring}
          />
        </GuardedPage>
      )}
      {currentPage === 'COMMUNITY' && <Community onNavigate={onNavigate} stats={stats} treasury={treasury} totalSips={totalSips} winnerHistory={winnerHistory} />}
    </>
  )
}

export default Layout