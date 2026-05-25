import { useState, useEffect } from "react"
import AOS from 'aos'
import img from './assets/imgs/bg-fox.jpeg'
import Header from "./frontend/shared/Header"
import Sidebar from "./frontend/shared/Sidebar"
import Layout from "./frontend/Layout"
import Footer from "./frontend/shared/Footer"

const initialPours = [
  { address: '0xA94f...7B9C', amount: 1200 },
  { address: '0xF8d3...9A2D', amount: 1000 },
  { address: '0xC7e1...4F5A', amount: 1000 },
]

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState('HOME')
  const [treasury, setTreasury] = useState(0)
  const [holders, setHolders] = useState(0)
  const [totalSips, setTotalSips] = useState(0)
  const [participants, setParticipants] = useState(0)
  const [pours, setPours] = useState(initialPours)
  const [lastWinner, setLastWinner] = useState({ winner: '0xA94f...7B9C', amount: 1200 })
  const [bottleTotal, setBottleTotal] = useState(0)
  const [mockTokenHoldings, setMockTokenHoldings] = useState([])

  const treasuryGoal = 20000
  const fillPercent = Math.min(100, Math.round((bottleTotal / treasuryGoal) * 100))

  // Generate mock token holdings based on participants
  const generateMockHoldings = (participantCount) => {
    const holdings = []
    for (let i = 0; i < Math.max(participantCount, 3); i++) {
      holdings.push({
        id: i,
        name: `Token ${String.fromCharCode(65 + (i % 26))}`,
        amount: Math.floor(Math.random() * 5000) + 1000,
        percentage: Math.floor(Math.random() * 30) + 10,
      })
    }
    return holdings.sort((a, b) => b.amount - a.amount)
  }

  useEffect(() => {
    AOS.init({
      once: true,
      duration: 700,
      easing: 'ease-out-cubic',
      anchorPlacement: 'top-bottom',
    })
  }, [])

  // Update holders based on participants
  useEffect(() => {
    setHolders(participants)
    setMockTokenHoldings(generateMockHoldings(participants))
  }, [participants])

  const handleNavigate = (page) => {
    setCurrentPage(page)
    setSidebarOpen(false) // close sidebar on navigate
  }

  const handlePour = () => {
    const amount = 1000
    const address = `0x${Math.random().toString(16).slice(2, 6)}...${Math.random().toString(16).slice(2, 6)}`
    const newPour = { address, amount }
    const newBottleTotal = bottleTotal + amount

    // Random chance (15%) to empty bottle and allocate 5% to treasury
    const emptyBottle = Math.random() < 0.15
    
    if (emptyBottle) {
      const treasuryAllocation = Math.floor(newBottleTotal * 0.05)
      setTreasury((current) => current + treasuryAllocation)
      setBottleTotal(0)
    } else {
      setBottleTotal(newBottleTotal)
    }

    setTotalSips((current) => current + 1)
    setParticipants((current) => current + 1)
    setPours((current) => [newPour, ...current].slice(0, 6))
    setLastWinner({ winner: address, amount })
  }

  return (
    <div className='relative min-h-screen flex flex-col'>

      {/* Background image + overlay */}
      <div
        className='fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat'
        style={{ backgroundImage: `url(${img})` }}
      >
        <div className='absolute inset-0 bg-[#0d0718]/80' />
        <div className='absolute inset-0 bg-gradient-to-r from-pink-800/30 to-purple-800/30' />
      </div>

      <Header
        isOpen={sidebarOpen}
        onMenuClick={() => setSidebarOpen((open) => !open)}
        onNavigate={handleNavigate}
        currentPage={currentPage}
      />

      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onNavigate={handleNavigate}
        currentPage={currentPage}
      />

      <main className='flex-grow'>
        <Layout
          currentPage={currentPage}
          onNavigate={handleNavigate}
          treasury={treasury}
          holders={holders}
          totalSips={totalSips}
          participants={participants}
          pours={pours}
          lastWinner={lastWinner}
          fillPercent={fillPercent}
          onPour={handlePour}
          mockTokenHoldings={mockTokenHoldings}
        />
      </main>

      <Footer onNavigate={handleNavigate} />

    </div>
  )
}

export default App