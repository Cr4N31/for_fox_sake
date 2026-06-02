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

const cronosMainnet = defineChain({
  id: 25,
  name: 'Cronos Mainnet',
  nativeCurrency: { name: 'Cronos', symbol: 'CRO', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://evm.cronos.org'] },
  },
  blockExplorers: {
    default: { name: 'Cronoscan', url: 'https://cronoscan.com' },
  },
})

const activeChain = cronosMainnet
// Project ID
const projectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID

//Wagmi Adapter
const wagmiAdapter = new WagmiAdapter({
  networks: [activeChain],
  projectId,
  connectors: [
    injected(),                   
    walletConnect({ projectId }), // for mobile wallets via QR
    coinbaseWallet({ projectId }), // for Coinbase Wallet
  ],
})

//AppKit
createAppKit({
  adapters: [wagmiAdapter],
  networks: [activeChain],
  projectId,
  metadata: {
    name: 'For Fox Sake',
    description: 'FFS Sake Bottle Jackpot',
    url: 'https://for-fox-sake.vercel.app',
    icons: [],
  },
  features: {
    analytics: false,
    email: false,
    socials: false,
  },

  enableInjected: true,                    
  multiInjectedProviderDiscovery: true, 
  enableWalletConnect: true,
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
