import { useState, useEffect } from 'react'
import { useSwitchChain, useChainId } from 'wagmi'
import { useAppKitAccount } from '@reown/appkit/react'
import AOS from 'aos'
import img from './assets/imgs/bg-fox.jpeg'
import Header from './frontend/shared/Header'
import Sidebar from './frontend/shared/Sidebar'
import Layout from './frontend/Layout'
import Footer from './frontend/shared/Footer'
import { useBottle } from './frontend/hooks/useBottle'

const apiBaseUrl = import.meta.env.VITE_FFS_API_URL || 'http://localhost:8787'
const TARGET_CHAIN_ID = Number(import.meta.env.VITE_CHAIN_ID || 338)

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState('HOME')
  const [pours, setPours] = useState([])
  const [winnerHistory, setWinnerHistory] = useState([])
  const [lastWinner, setLastWinner] = useState({ winner: '', amount: 0 })
  const [stats, setStats] = useState({
    total_rounds: 0,
    total_ffs_distributed: 0,
    total_pours: 0,
    total_participants: 0,
  })

    // Chain switching
  const { isConnected } = useAppKitAccount()
  const chainId = useChainId()
  const { switchChain } = useSwitchChain()

  useEffect(() => {
    if (isConnected && chainId !== TARGET_CHAIN_ID) {
      switchChain({ chainId: TARGET_CHAIN_ID })
    }
  }, [isConnected, chainId])

  const fetchActivity = async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/api/activity`)
      if (!response.ok) throw new Error('Unable to load activity')
      const activity = await response.json()
      setPours(
        Array.isArray(activity)
          ? activity.slice(0, 50).map((item) => ({
              type: item.type,
              address: item.wallet_address
                ? `${item.wallet_address.slice(0, 6)}...${item.wallet_address.slice(-4)}`
                : 'unknown',
              amount: Number(item.amount),
              transactionHash: item.transaction_hash,
              round: item.round_number,
              timestamp: item.timestamp,
            }))
          : [],
      )
    } catch (error) {
      console.error('Fetch activity failed:', error)
      setPours([])
    }
  }

  const fetchWinners = async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/api/winners`)
      if (!response.ok) throw new Error('Unable to load winners')
      const data = await response.json()
      const winners = Array.isArray(data)
        ? data.map((row) => ({
            ...row,
            shortWinner: row.winner_address
              ? `${row.winner_address.slice(0, 6)}...${row.winner_address.slice(-4)}`
              : '',
            winnerAmount: Number(row.amount_won),
            treasuryAmount: Number(row.treasury_amount),
          }))
        : []
      setWinnerHistory(winners)
      if (winners.length > 0) {
        setLastWinner({
          winner: winners[0].shortWinner,
          amount: winners[0].winnerAmount,
        })
      }
    } catch (error) {
      console.error('Fetch winners failed:', error)
      setWinnerHistory([])
    }
  }

  const fetchStats = async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/api/stats`)
      if (!response.ok) throw new Error('Unable to load stats')
      const data = await response.json()
      setStats({
        total_rounds: Number(data.total_rounds ?? 0),
        total_ffs_distributed: Number(data.total_ffs_distributed ?? 0),
        total_pours: Number(data.total_pours ?? 0),
        total_participants: Number(data.total_participants ?? 0),
      })
    } catch (error) {
      console.error('Fetch stats failed:', error)
      setStats({
        total_rounds: 0,
        total_ffs_distributed: 0,
        total_pours: 0,
        total_participants: 0,
      })
    }
  }

  const {
    treasury,
    participants,
    totalSips,
    fillPercent,
    sipNonce,
    handlePour,
    isPouring,
    isConnected: isBottleConnected,
    roundNumber,
    refreshContractData,
  } = useBottle({
    onPourEvent: async () => {
      await new Promise(resolve => setTimeout(resolve, 2000))
      await fetchActivity()
      await refreshContractData()
    },
    onSipEvent: async (winnerPayload) => {
      if (winnerPayload) setLastWinner(winnerPayload)
      await new Promise(resolve => setTimeout(resolve, 2000))
      await fetchWinners()
      await fetchStats()
      await fetchActivity()
      await refreshContractData()
    },
  })

  const handleNavigate = (page) => {
    setCurrentPage(page)
    setSidebarOpen(false)
  }

  useEffect(() => {
    AOS.init({
      once: true,
      duration: 700,
      easing: 'ease-out-cubic',
      anchorPlacement: 'top-bottom',
    })
  }, [])

  useEffect(() => {
    fetchActivity()
    fetchWinners()
    fetchStats()

    const interval = setInterval(() => {
      fetchActivity()
      fetchStats()
    }, 10000)

    return () => clearInterval(interval)
  }, []);

  

  return (
    <div className='relative min-h-screen flex flex-col'>
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
          holders={participants}
          totalSips={totalSips}
          participants={participants}
          pours={pours}
          lastWinner={lastWinner}
          winnerHistory={winnerHistory}
          fillPercent={fillPercent}
          onPour={handlePour}
          mockTokenHoldings={[]}
          sipNonce={sipNonce}
          isPouring={isPouring}
          stats={stats}
        />
      </main>

      <Footer onNavigate={handleNavigate} />
    </div>
  )
}

export default App