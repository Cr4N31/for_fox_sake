# For Fox Sake Frontend

React + Vite frontend for the For Fox Sake Dapp.

## Prerequisites

- Node.js 18+ installed
- npm available
- A wallet that supports WalletConnect or injected providers
- A deployed `FFSBottle` contract and a token contract address

## Install and run locally

```bash
cd for_fox_sake
npm install
cp .env.example .env
npm run dev
```

Then open the URL printed by Vite (typically `http://localhost:5173`).

## Environment variables

Create a `.env` file from `.env.example` and fill in the values:

- `VITE_WALLETCONNECT_PROJECT_ID` — WalletConnect project ID for mobile wallet connections
- `VITE_FFS_TOKEN_ADDRESS` — ERC-20 token contract address for FFS approvals and balance checks
- `VITE_FFS_BOTTLE_ADDRESS` — deployed `FFSBottle` contract address
- `VITE_FFS_API_URL` — backend API URL for activity, winners, and stats (for example `http://localhost:8787`)
- `VITE_CHAIN_ID` — set to `25` for Cronos mainnet; otherwise the app uses Cronos testnet by default

## How it works

- The frontend connects to Cronos testnet by default.
- If `VITE_CHAIN_ID=25`, it switches to Cronos mainnet.
- Wallet connections are handled via RainbowKit / wagmi with injected wallets, WalletConnect, or Coinbase Wallet.
- The app uses the contract addresses and ABI data configured in environment variables to display bottle status, pours, winners, and treasury data.

## Usage

1. Start the frontend with `npm run dev`.
2. Open the Vite URL in your browser.
3. Connect your wallet.
4. Interact with the FFS Bottle and view live stats.
5. Ensure `VITE_FFS_API_URL` points to the running indexer backend to populate activity and leaderboard features.

## Build for production

```bash
npm run build
```

To preview the production build:

```bash
npm run preview
```
