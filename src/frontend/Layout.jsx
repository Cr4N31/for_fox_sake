import Home from "./pages/Home"
import About from "./pages/About"
import Treasury from "./pages/Treasury"
import Dashboard from "./pages/Dashboard"
import Community from "./pages/Community"

function Layout({ currentPage = 'HOME', onNavigate }) {
  return (
    <>
      {currentPage === 'HOME'      && <Home      onNavigate={onNavigate} />}
      {currentPage === 'ABOUT'     && <About     onNavigate={onNavigate} />}
      {currentPage === 'TREASURY'  && <Treasury  onNavigate={onNavigate} />}
      {currentPage === 'DASHBOARD' && <Dashboard onNavigate={onNavigate} />}
      {currentPage === 'COMMUNITY' && <Community onNavigate={onNavigate} />}
    </>
  )
}

export default Layout