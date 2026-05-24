import { useState, useEffect } from "react"
import AOS from 'aos'
import img from './assets/imgs/bg-fox.jpeg'
import Header from "./frontend/shared/Header"
import Sidebar from "./frontend/shared/Sidebar"
import Layout from "./frontend/Layout"
import Footer from "./frontend/shared/Footer"

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState('HOME')

  useEffect(() => {
    AOS.init({
      once: true,
      duration: 700,
      easing: 'ease-out-cubic',
      anchorPlacement: 'top-bottom',
    })
  }, [])

  const handleNavigate = (page) => {
    setCurrentPage(page)
    setSidebarOpen(false) // close sidebar on navigate
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
        />
      </main>

      <Footer onNavigate={handleNavigate} />

    </div>
  )
}

export default App