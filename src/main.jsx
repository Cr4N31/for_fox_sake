import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'aos/dist/aos.css'
import App from './App.jsx'

import { createAppKit } from '@reown/appkit/react'
import { WagmiProvider } from 'wagmi'
import { defineChain } from 'viem'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { injected, walletConnect, coinbaseWallet } from 'wagmi/connectors'

// 1. Define Cronos chain
const cronos = defineChain({
  id: 25,
  name: 'Cronos',
  nativeCurrency: { name: 'Cronos', symbol: 'CRO', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://evm.cronos.org'] },
  },
  blockExplorers: {
    default: { name: 'Cronoscan', url: 'https://cronoscan.com' },
  },
})

// 2. Project ID
const projectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID

// 3. Wagmi Adapter
const wagmiAdapter = new WagmiAdapter({
  networks: [cronos],
  projectId,
  connectors: [
    injected(),                   
    walletConnect({ projectId }), // for mobile wallets via QR
    coinbaseWallet({ projectId }), // for Coinbase Wallet
  ],
})

// 4. Create AppKit
createAppKit({
  adapters: [wagmiAdapter],
  networks: [cronos],
  projectId,
  metadata: {
    name: 'For Fox Sake',
    description: 'FFS Sake Bottle Jackpot',
    url: 'http://localhost:5173',
    icons: [],
  },
  features: {
    analytics: false,
  },

  enableInjected: true,                    
  multiInjectedProviderDiscovery: true, 
})

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </WagmiProvider>
  </StrictMode>,
)