export const GRAPH_CONFIG = {
  BASE_URL:
    'https://gateway.thegraph.com/api/subgraphs/id/GENunSHWLBXm59mBSgPzQ8metBEp9YDfdqwFr91Av1UM',
  getApiKey: () => {
    const apiKey = process.env.GRAPH_API_KEY;
    if (!apiKey) {
      throw new Error('GRAPH_API_KEY environment variable is not set');
    }
    return apiKey;
  },
} as const;

export type GraphPool = {
  id: string;
  token0: {
    id: string;
    symbol: string;
    decimals: number;
  };
  token1: {
    id: string;
    symbol: string;
    decimals: number;
  };
  feeTier: string;
  liquidity: string;
  sqrtPrice: string;
  tick: string;
  volumeToken0: string;
  volumeToken1: string;
  volumeUSD: string;
  feesUSD: string;
  totalValueLockedToken0: string;
  totalValueLockedToken1: string;
  totalValueLockedUSD: string;
  txCount: string;
  apr?: string;
  riskLevel?: string;
};

export type GraphGauge = {
  id: string;
  pool: string;
  rewards: Array<{
    token: string;
    amount: string;
    period: number;
  }>;
  votingPower: string;
  boost: string;
  bribes?: Array<{
    token: string;
    amount: string;
    apr: string;
  }>;
};

export type GraphPortfolio = {
  totalValue: string;
  positions: Array<{
    pool: {
      id: string;
      totalValueLockedUSD: string;
    };
    value: string;
    rewards: string;
  }>;
};

export type GraphYieldStrategy = {
  pool: string;
  expectedYield: string;
  riskLevel: string;
};

export type GraphPositionManagement = {
  optimalEntry: {
    token0Amount: string;
    token1Amount: string;
    slippage: string;
  };
  optimalExit: {
    token0Amount: string;
    token1Amount: string;
    slippage: string;
  };
};

export type GraphBribeStrategy = {
  roi: string;
  optimalAmount: string;
  timing: string;
};

export type GraphRouting = {
  path: string[];
  expectedOutput: string;
  gasCost: string;
};
