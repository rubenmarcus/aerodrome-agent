export const BASE_RPC_URL = 'https://mainnet.base.org';

export const AERODROME_CONTRACTS = {
  ROUTER: '0xcF77a3Ba9A5CA399B7c97c74d54e5b1Beb874E43',
  FACTORY: '0x420DD381b31aEFF66848C8B1D6B3a5a1A0F8B1C0',
  GAUGE_FACTORY: '0x420DD381b31aEFF66848C8B1D6B3a5a1A0F8B1C0',
  VOTING_ESCROW: '0x420DD381b31aEFF66848C8B1D6B3a5a1A0F8B1C0',
  BRIBE_FACTORY: '0x420DD381b31aEFF66848C8B1D6B3a5a1A0F8B1C0',
  FEE_DISTRIBUTOR: '0x420DD381b31aEFF66848C8B1D6B3a5a1A0F8B1C0',
  AERO_TOKEN: '0x940181a94A35A4569E4529A3CDfB74e38FD98631',
};

export const AERODROME_ABI = {
  ROUTER: [
    'function swapExactTokensForTokens(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external returns (uint[] memory amounts)',
    'function addLiquidity(address tokenA, address tokenB, uint amountADesired, uint amountBDesired, uint amountAMin, uint amountBMin, address to, uint deadline) external returns (uint amountA, uint amountB, uint liquidity)',
    'function removeLiquidity(address tokenA, address tokenB, uint liquidity, uint amountAMin, uint amountBMin, address to, uint deadline) external returns (uint amountA, uint amountB)',
  ],
  GAUGE: [
    'function deposit(uint amount) external',
    'function withdraw(uint amount) external',
    'function getReward() external',
    'function vote(uint weight) external',
    'function boost(uint amount) external',
  ],
  VOTING_ESCROW: [
    'function createLock(uint amount, uint unlockTime) external',
    'function increaseAmount(uint tokenId, uint amount) external',
    'function increaseUnlockTime(uint tokenId, uint unlockTime) external',
    'function merge(uint from, uint to) external',
    'function split(uint tokenId, uint amount) external',
    'function withdraw(uint tokenId) external',
  ],
  BRIBE: [
    'function depositBribe(address token, uint amount) external',
    'function withdrawBribe(address token) external',
    'function claimBribes() external',
  ],
  FEE_DISTRIBUTOR: [
    'function claimFees() external',
  ],
};

export const POOL_FEES = {
  STABLE: 1, // 0.01%
  VOLATILE: 30, // 0.3%
  HIGH: 100, // 1%
};

export const MAX_SLIPPAGE = 50; // 0.5%
export const MAX_DEADLINE = 30 * 60; // 30 minutes
export const MIN_LOCK_DURATION = 1; // 1 week
export const MAX_LOCK_DURATION = 208; // 4 years