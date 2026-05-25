import Home from "./pages/Home"
import About from "./pages/About"
import Treasury from "./pages/Treasury"
import Dashboard from "./pages/Dashboard"
import Community from "./pages/Community"

function Layout({ currentPage = 'HOME', onNavigate, treasury, holders, totalSips, participants, pours, lastWinner, winnerHistory, fillPercent, onPour, mockTokenHoldings, sipNonce, isPouring }) {
  return (
    <>
      {currentPage === 'HOME'      && <Home      onNavigate={onNavigate} holders={holders} treasury={treasury} totalSips={totalSips} onPour={onPour} isPouring={isPouring} />}
      {currentPage === 'ABOUT'     && <About     onNavigate={onNavigate} />}
      {currentPage === 'TREASURY'  && <Treasury  onNavigate={onNavigate}
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
                                                isPouring={isPouring} />}
      {currentPage === 'DASHBOARD' && <Dashboard onNavigate={onNavigate}
                                                balance={treasury}
                                                fillPercent={fillPercent}
                                                participants={participants}
                                                totalSips={totalSips}
                                                mockTokenHoldings={mockTokenHoldings}
                                                onPour={onPour}
                                                isPouring={isPouring} />}
      {currentPage === 'COMMUNITY' && <Community onNavigate={onNavigate} />}
    </>
  )
}

export default Layout
