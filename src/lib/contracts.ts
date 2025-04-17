import { createPublicClient, http, parseAbi, getContract } from 'viem';
import { base } from 'viem/chains';
import { AERODROME_ROUTER } from '@/app/config';

export const client = createPublicClient({
  chain: base,
  transport: http()
});

export const ROUTER_ABI = [
  {
    inputs: [
      { name: 'amountIn', type: 'uint256' },
      { name: 'amountOutMin', type: 'uint256' },
      { name: 'path', type: 'address[]' },
      { name: 'to', type: 'address' },
      { name: 'deadline', type: 'uint256' }
    ],
    name: 'swapExactTokensForTokens',
    outputs: [{ name: 'amounts', type: 'uint256[]' }],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      { name: 'tokenA', type: 'address' },
      { name: 'tokenB', type: 'address' },
      { name: 'amountADesired', type: 'uint256' },
      { name: 'amountBDesired', type: 'uint256' },
      { name: 'amountAMin', type: 'uint256' },
      { name: 'amountBMin', type: 'uint256' },
      { name: 'to', type: 'address' },
      { name: 'deadline', type: 'uint256' }
    ],
    name: 'addLiquidity',
    outputs: [
      { name: 'amountA', type: 'uint256' },
      { name: 'amountB', type: 'uint256' },
      { name: 'liquidity', type: 'uint256' }
    ],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      { name: 'tokenA', type: 'address' },
      { name: 'tokenB', type: 'address' }
    ],
    name: 'getPool',
    outputs: [{ name: 'pool', type: 'address' }],
    stateMutability: 'view',
    type: 'function'
  }
];

export const VOTER_ABI = [
  {
    inputs: [
      { name: 'pool', type: 'address' },
      { name: 'weight', type: 'uint256' }
    ],
    name: 'vote',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      { name: 'pools', type: 'address[]' },
      { name: 'weights', type: 'uint256[]' }
    ],
    name: 'vote',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  }
];

export const CONTRACTS = {
  VOTER: '0x16613524e02ad97eDfeF371bC883F2F5d6C480A5',
  VOTING_ESCROW: '0xeBf418Fe2512e7E6bd9b87a8F0f294aCDC67e6B4',
  GAUGE_CONTROLLER: '0x99C88e7c0c5D1B9E6E8a0F7e0a0F7e0a0F7e0a0F7',
  BRIBE_FACTORY: '0x99C88e7c0c5D1B9E6E8a0F7e0a0F7e0a0F7e0a0F7',
} as const;

export const routerContract = getContract({
  address: AERODROME_ROUTER,
  abi: ROUTER_ABI,
  client
});

export const ERC20_ABI = parseAbi([
  'function symbol() view returns (string)',
  'function decimals() view returns (uint8)',
  'function balanceOf(address) view returns (uint256)',
  'function allowance(address, address) view returns (uint256)',
  'function approve(address, uint256) returns (bool)',
  'function transfer(address, uint256) returns (bool)',
  'function transferFrom(address, address, uint256) returns (bool)',
]);

export const POOL_ABI = parseAbi([
  'function getReserves() view returns (uint112, uint112, uint32)',
  'function totalSupply() view returns (uint256)',
  'function token0() view returns (address)',
  'function token1() view returns (address)',
  'function swap(uint256, uint256, address, bytes) returns (uint256)',
  'function addLiquidity(address, address, uint256, uint256, uint256, uint256) returns (uint256)',
  'function removeLiquidity(address, address, uint256, uint256, uint256) returns (uint256)',
]);

export const VOTING_ESCROW_ABI = parseAbi([
  'function create_lock(uint256, uint256) returns (bool)',
  'function increase_amount(uint256) returns (bool)',
  'function increase_unlock_time(uint256) returns (bool)',
  'function withdraw() returns (bool)',
  'function balanceOf(address) view returns (uint256)',
  'function locked(address) view returns (uint256, uint256)',
  'function locked__end(address) view returns (uint256)',
]);

export const GAUGE_ABI = parseAbi([
  'function deposit(uint256) returns (bool)',
  'function withdraw(uint256) returns (bool)',
  'function getReward() returns (bool)',
  'function balanceOf(address) view returns (uint256)',
  'function earned(address) view returns (uint256)',
  'function pool() view returns (address)',
  'function totalVotes() view returns (uint256)',
  'function currentApr() view returns (uint256)',
  'function totalSupply() view returns (uint256)',
  'function rewardRate() view returns (uint256)',
  'function periodFinish() view returns (uint256)',
  'function rewardToken() view returns (address)',
]);

export const GAUGE_CONTROLLER_ABI = parseAbi([
  'function vote_for_gauge_weights(address, uint256) returns (bool)',
  'function gauge_relative_weight(address) view returns (uint256)',
  'function get_gauge_weight(address) view returns (uint256)',
  'function get_total_weight() view returns (uint256)',
]);

export const BRIBE_ABI = parseAbi([
  'function createBribe(address, address, uint256) returns (bool)',
  'function getActiveBribes(address) view returns ((address,uint256,uint256,uint256)[])',
  'function getBribeValue(address) view returns (uint256)',
  'function getBribeAPR(address) view returns (uint256)',
]);