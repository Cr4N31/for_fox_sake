import Home from "./pages/Home"
import About from "./pages/About"
import Treasury from "./pages/Treasury"
import Dashboard from "./pages/Dashboard"
import Community from "./pages/Community"

function Layout({ currentPage = 'HOME' }){
    return(
        <>
            {currentPage === 'HOME' && <Home />}
            {currentPage === 'ABOUT' && <About />}
            {currentPage === 'TREASURY' && <Treasury />}
            {currentPage === 'DASHBOARD' && <Dashboard />}
            {currentPage === 'COMMUNITY' && <Community />}
        </>
    )
}

export default Layout