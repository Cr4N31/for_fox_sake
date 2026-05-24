import { useState } from "react"
import img from './assets/imgs/bg-fox.jpeg'
import Header from "./frontend/shared/Header"
import Sidebar from "./frontend/shared/Sidebar"
import Layout from "./frontend/Layout"
import Footer from "./frontend/shared/Footer"

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState('HOME')

  return (
    <div className='relative min-h-screen flex flex-col'>

      {/* Background image + overlay */}
      <div
        className='fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat'
        style={{ backgroundImage: `url(${img})` }}
      >
        {/* Dark base so content stays readable */}
        <div className='absolute inset-0 bg-[#0d0718]/80' />
        {/* Pink overlay */}
        <div className='absolute inset-0 bg-gradient-to-r from-pink-800/30 to-purple-800/30' />
      </div>

      <Header
        isOpen={sidebarOpen}
        onMenuClick={() => setSidebarOpen((open) => !open)}
      />
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onNavigate={(page) => setCurrentPage(page)}
      />

      <main className='flex-grow'>
        <Layout currentPage={currentPage} />
      </main>

      <Footer />
    </div>
  )
}

export default App