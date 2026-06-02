# For Fox Sake Frontend

React + Vite frontend for the For Fox Sake dApp.

## Required Production Configuration

```env
VITE_CHAIN_ID=25
VITE_FFS_TOKEN_ADDRESS=0xf9D90e9f8E3fcc41D44e220deDB73DF6c42c8244
VITE_FFS_BOTTLE_ADDRESS=0x93E7a174E1DadfE429De8D0E0f281ee1851820E9
VITE_TREASURY_WALLET=0x75d04bcA6B542Fe1f3EeE8196DEB2C2675dAABcb
VITE_FFS_API_URL=https://ffs-indexer.onrender.com
```

The frontend connects only to Cronos Mainnet and uses the bottle contract for game logic. ERC20 `approve()` is sent to the FFS token, and `pour()` is sent to the bottle contract.

## Install And Run

```bash
cd for_fox_sake
npm install
cp .env.example .env
npm run dev
```

## Environment Variables

- `VITE_WALLETCONNECT_PROJECT_ID` - WalletConnect project ID.
- `VITE_FFS_TOKEN_ADDRESS` - must be `0xf9D90e9f8E3fcc41D44e220deDB73DF6c42c8244`.
- `VITE_FFS_BOTTLE_ADDRESS` - must be `0x93E7a174E1DadfE429De8D0E0f281ee1851820E9`.
- `VITE_TREASURY_WALLET` - must be `0x75d04bcA6B542Fe1f3EeE8196DEB2C2675dAABcb`.
- `VITE_FFS_API_URL` - backend indexer API URL.
- `VITE_CHAIN_ID` - must be `25`.
- `VITE_CRONOSCAN_API_KEY` - optional Cronoscan API key.

## Build

```bash
npm run build
```
