import { useState } from "react"
import Header from "./frontend/shared/Header"
import Sidebar from "./frontend/shared/Sidebar"
import Layout from "./frontend/Layout"
import Footer from "./frontend/shared/Footer"

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return(
    <>
      <Header
        isOpen={sidebarOpen}
        onMenuClick={() => setSidebarOpen((open) => !open)}
      />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <Layout/>
      <Footer/>
    </>

  )
}
export default App