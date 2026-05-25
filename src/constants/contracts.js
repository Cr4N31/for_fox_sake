export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'

export const FFS_BOTTLE_ADDRESS =
  import.meta.env.VITE_FFS_BOTTLE_ADDRESS || ZERO_ADDRESS

export const FFS_TOKEN_ADDRESS =
  import.meta.env.VITE_FFS_TOKEN_ADDRESS || ZERO_ADDRESS

export const isContractConfigured =
  FFS_BOTTLE_ADDRESS !== ZERO_ADDRESS && FFS_TOKEN_ADDRESS !== ZERO_ADDRESS

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
    stateMutability: 'nonpayable',
    inputs: [],
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
    stateMutability: 'nonpayable',
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
