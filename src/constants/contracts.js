export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'
export const REQUIRED_CHAIN_ID = 25
export const REQUIRED_CHAIN_NAME = 'Cronos Mainnet'
export const REQUIRED_RPC_URL = 'https://evm.cronos.org'
export const REQUIRED_FFS_TOKEN_ADDRESS = '0xf9D90e9f8E3fcc41D44e220deDB73DF6c42c8244'
export const REQUIRED_FFS_BOTTLE_ADDRESS = '0x93E7a174E1DadfE429De8D0E0f281ee1851820E9'
export const REQUIRED_TREASURY_WALLET = '0x75d04bcA6B542Fe1f3EeE8196DEB2C2675dAABcb'

export const FFS_BOTTLE_ADDRESS =
  import.meta.env.VITE_FFS_BOTTLE_ADDRESS || REQUIRED_FFS_BOTTLE_ADDRESS

export const FFS_TOKEN_ADDRESS =
  import.meta.env.VITE_FFS_TOKEN_ADDRESS || REQUIRED_FFS_TOKEN_ADDRESS

export const TREASURY_WALLET =
  import.meta.env.VITE_TREASURY_WALLET || REQUIRED_TREASURY_WALLET

const addressesMatch = (actual, expected) => actual.toLowerCase() === expected.toLowerCase()

export const isContractConfigured =
  addressesMatch(FFS_BOTTLE_ADDRESS, REQUIRED_FFS_BOTTLE_ADDRESS) &&
  addressesMatch(FFS_TOKEN_ADDRESS, REQUIRED_FFS_TOKEN_ADDRESS) &&
  addressesMatch(TREASURY_WALLET, REQUIRED_TREASURY_WALLET) &&
  Number(import.meta.env.VITE_CHAIN_ID || REQUIRED_CHAIN_ID) === REQUIRED_CHAIN_ID

export const FFS_BOTTLE_ABI = [
  {
    type: 'function',
    name: 'POUR_AMOUNT',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ type: 'uint256' }],
  },
  {
    type: 'function',
    name: 'bottleBalance',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ type: 'uint256' }],
  },
  {
    type: 'function',
    name: 'currentRound',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ type: 'uint256' }],
  },
  {
    type: 'function',
    name: 'fillPercent',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ type: 'uint256' }],
  },
  {
    type: 'function',
    name: 'pour',
    stateMutability: 'payable',
    inputs: [{ name: 'ffsAmount', type: 'uint256' }],
    outputs: [],
  },
  {
    type: 'function',
    name: 'roundPours',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ type: 'uint256' }],
  },
  {
    type: 'function',
    name: 'totalPours',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ type: 'uint256' }],
  },
  {
    type: 'function',
    name: 'totalSips',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ type: 'uint256' }],
  },
  {
    type: 'event',
    name: 'BottleSipped',
    inputs: [
      { indexed: true, name: 'round', type: 'uint256' },
      { indexed: true, name: 'winner', type: 'address' },
      { indexed: false, name: 'bottleBalance', type: 'uint256' },
      { indexed: false, name: 'winnerAmount', type: 'uint256' },
      { indexed: false, name: 'treasuryAmount', type: 'uint256' },
    ],
  },
  {
    type: 'event',
    name: 'Poured',
    inputs: [
      { indexed: true, name: 'round', type: 'uint256' },
      { indexed: true, name: 'user', type: 'address' },
      { indexed: false, name: 'amount', type: 'uint256' },
      { indexed: false, name: 'croAmount', type: 'uint256' },
      { indexed: false, name: 'ffsAmount', type: 'uint256' },
      { indexed: false, name: 'bottleBalance', type: 'uint256' },
      { indexed: false, name: 'roundPours', type: 'uint256' },
    ],
  },
  {
    type: 'event',
    name: 'RoundStarted',
    inputs: [{ indexed: true, name: 'round', type: 'uint256' }],
  },
]

export const FFS_TOKEN_ABI = [
  {
    type: 'function',
    name: 'allowance',
    stateMutability: 'view',
    inputs: [
      { name: 'owner', type: 'address' },
      { name: 'spender', type: 'address' },
    ],
    outputs: [{ type: 'uint256' }],
  },
  {
    type: 'function',
    name: 'approve',
    stateMutability: 'payable',
    inputs: [
      { name: 'spender', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    outputs: [{ type: 'bool' }],
  },
  {
    type: 'function',
    name: 'balanceOf',
    stateMutability: 'view',
    inputs: [{ name: 'account', type: 'address' }],
    outputs: [{ type: 'uint256' }],
  },
]