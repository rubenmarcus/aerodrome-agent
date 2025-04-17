import {
  GRAPH_CONFIG,
  type GraphBribeStrategy,
  type GraphGauge,
  type GraphPool,
  type GraphPortfolio,
  type GraphPositionManagement,
  type GraphRouting,
  type GraphYieldStrategy,
} from '@/config/graph';

async function fetchGraph<T>(query: string, variables?: Record<string, any>): Promise<T> {
  try {
    console.log('Making GraphQL request with variables:', variables);
    const response = await fetch(GRAPH_CONFIG.BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${GRAPH_CONFIG.getApiKey()}`,
      },
      body: JSON.stringify({
        query,
        variables: {
          ...variables,
          subgraphError: 'deny',
        },
      }),
    });

    console.log('Response status:', response.status);

    if (!response.ok) {
      if (response.status === 429) {
        throw new Error('Rate limit exceeded. Please try again later.');
      }
      throw new Error(`GraphQL request failed: ${response.statusText}`);
    }

    const responseData = await response.json();
    console.log('Raw response data:', responseData);

    const { data, errors } = responseData;

    if (errors) {
      // Handle specific GraphQL errors
      const errorMessages = errors.map((error: any) => {
        if (error.message.includes('rate limit')) {
          return 'Rate limit exceeded. Please try again later.';
        }
        if (error.message.includes('query complexity')) {
          return 'Query too complex. Please simplify your request.';
        }
        return error.message;
      });
      throw new Error(`GraphQL errors: ${errorMessages.join(', ')}`);
    }

    if (!data) {
      throw new Error('No data returned from GraphQL query');
    }

    return data;
  } catch (error) {
    console.error('Error in fetchGraph:', error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Unknown error occurred while fetching from The Graph');
  }
}

export async function getPool(poolId: string): Promise<GraphPool | null> {
  const query = `
    query GetPool($id: ID!) {
      pool(id: $id) {
        id
        token0 {
          id
          symbol
          decimals
        }
        token1 {
          id
          symbol
          decimals
        }
        feeTier
        liquidity
        sqrtPrice
        tick
        volumeToken0
        volumeToken1
        volumeUSD
        feesUSD
        totalValueLockedToken0
        totalValueLockedToken1
        totalValueLockedUSD
        txCount
      }
    }
  `;

  const data = await fetchGraph<{ pool: GraphPool }>(query, { id: poolId.toLowerCase() });
  return data.pool || null;
}

export async function getPools(params?: {
  token?: string;
  token0?: string;
  token1?: string;
  minLiquidity?: string;
  minVolume?: string;
  feeTier?: string;
  limit?: number;
  sortBy?: 'liquidity' | 'volume' | 'totalValueLockedUSD';
  sortOrder?: 'asc' | 'desc';
}): Promise<GraphPool[]> {
  console.log('getPools called with params:', params);

  const query = `
    query GetPools(
      $where: Pool_filter
      $orderBy: Pool_orderBy
      $orderDirection: OrderDirection
      $first: Int
      $subgraphError: _SubgraphErrorPolicy_! = deny
    ) {
      pools(
        where: $where
        orderBy: $orderBy
        orderDirection: $orderDirection
        first: $first
        subgraphError: $subgraphError
      ) {
        id
        token0 {
          id
          symbol
          decimals
        }
        token1 {
          id
          symbol
          decimals
        }
        feeTier
        liquidity
        sqrtPrice
        tick
        volumeToken0
        volumeToken1
        volumeUSD
        feesUSD
        totalValueLockedToken0
        totalValueLockedToken1
        totalValueLockedUSD
        txCount
      }
    }
  `;

  const where = {
    ...(params?.token && {
      or: [{ token0: params.token.toLowerCase() }, { token1: params.token.toLowerCase() }],
    }),
    ...(params?.token0 && { token0: params.token0.toLowerCase() }),
    ...(params?.token1 && { token1: params.token1.toLowerCase() }),
    ...(params?.minLiquidity && { liquidity_gte: params.minLiquidity }),
    ...(params?.minVolume && { volumeUSD_gte: params.minVolume }),
    ...(params?.feeTier && { feeTier: params.feeTier }),
  };

  console.log('Constructed where clause:', where);

  const orderByMap = {
    liquidity: 'liquidity',
    volume: 'volumeUSD',
    totalValueLockedUSD: 'totalValueLockedUSD',
  };

  // Map the sort order to the correct enum value
  const orderDirectionMap = {
    asc: 'asc',
    desc: 'desc',
  };

  const variables = {
    where,
    orderBy: orderByMap[params?.sortBy || 'liquidity'],
    orderDirection: orderDirectionMap[params?.sortOrder || 'desc'],
    first: params?.limit || 5,
  };

  console.log('GraphQL variables:', variables);

  const data = await fetchGraph<{ pools: GraphPool[] }>(query, variables);
  console.log('Received pools data:', data);

  if (!data || !data.pools) {
    throw new Error('Invalid response format: pools data is missing');
  }

  return data.pools;
}

export async function getGauges(params?: {
  pool?: string;
  minVotingPower?: string;
  minBoost?: string;
}): Promise<GraphGauge[]> {
  const query = `
    query GetGauges(
      $where: Gauge_filter
      $subgraphError: _SubgraphErrorPolicy_! = deny
    ) {
      gauges(
        where: $where
        subgraphError: $subgraphError
      ) {
        id
        address
        pool
        rewards {
          token
          amount
          period
        }
        votingPower
        boost
      }
    }
  `;

  const where = {
    ...(params?.pool && { pool: params.pool.toLowerCase() }),
    ...(params?.minVotingPower && { votingPower_gte: params.minVotingPower }),
    ...(params?.minBoost && { boost_gte: params.minBoost }),
  };

  const data = await fetchGraph<{ gauges: GraphGauge[] }>(query, { where });
  return data.gauges;
}

export async function getPortfolio(address: string): Promise<GraphPortfolio> {
  const query = `
    query GetPortfolio($address: String!) {
      user(id: $address) {
        positions {
          pool {
            id
            totalValueLockedUSD
          }
          value
          rewards
        }
      }
    }
  `;

  const data = await fetchGraph<{ user: { positions: any[] } }>(query, { address });
  if (!data?.user) {
    throw new Error('No portfolio data found for address');
  }

  const totalValue = data.user.positions
    .reduce((sum, pos) => sum + Number.parseFloat(pos.value), 0)
    .toString();

  return {
    totalValue,
    positions: data.user.positions.map((pos) => ({
      pool: pos.pool,
      value: pos.value,
      rewards: pos.rewards,
    })),
  };
}

export async function getYieldOptimization(
  _riskTolerance: 'low' | 'medium' | 'high',
): Promise<{ strategies: GraphYieldStrategy[] }> {
  const query = `
    query GetYieldOptimization {
      pools(
        orderBy: totalValueLockedUSD
        orderDirection: desc
        first: 10
      ) {
        id
        apr
        riskLevel
      }
    }
  `;

  const data = await fetchGraph<{ pools: GraphPool[] }>(query);
  if (!data?.pools) {
    throw new Error('No yield optimization data found');
  }

  return {
    strategies: data.pools.map((pool) => ({
      pool: pool.id,
      expectedYield: pool.apr || '0',
      riskLevel: pool.riskLevel || 'medium',
    })),
  };
}

export async function getPositionManagement(
  poolAddress: string,
  amount: string,
): Promise<GraphPositionManagement> {
  const query = `
    query GetPositionManagement($poolAddress: String!) {
      pool(id: $poolAddress) {
        token0 {
          id
          decimals
        }
        token1 {
          id
          decimals
        }
        liquidity
        sqrtPrice
      }
    }
  `;

  const data = await fetchGraph<{ pool: GraphPool }>(query, { poolAddress });
  if (!data?.pool) {
    throw new Error('Pool not found');
  }

  // Calculate optimal entry/exit based on pool state
  const optimalEntry = calculateOptimalEntry(data.pool, amount);
  const optimalExit = calculateOptimalExit(data.pool, amount);

  return {
    optimalEntry,
    optimalExit,
  };
}

export async function getBribeStrategy(gaugeAddress: string): Promise<GraphBribeStrategy> {
  const query = `
    query GetBribeStrategy($gaugeAddress: String!) {
      gauge(id: $gaugeAddress) {
        bribes {
          token
          amount
          apr
        }
        votingPower
      }
    }
  `;

  const data = await fetchGraph<{ gauge: GraphGauge }>(query, { gaugeAddress });
  if (!data?.gauge) {
    throw new Error('Gauge not found');
  }

  // Calculate bribe strategy based on gauge state
  const strategy = calculateBribeStrategy(data.gauge);

  return strategy;
}

export async function getOptimalRouting(
  tokenIn: string,
  tokenOut: string,
  amount: string,
): Promise<GraphRouting> {
  const query = `
    query GetOptimalRouting($tokenIn: String!, $tokenOut: String!) {
      pools(
        where: {
          or: [
            { token0: $tokenIn, token1: $tokenOut }
            { token0: $tokenOut, token1: $tokenIn }
          ]
        }
      ) {
        id
        token0 {
          id
          decimals
        }
        token1 {
          id
          decimals
        }
        liquidity
        sqrtPrice
      }
    }
  `;

  const data = await fetchGraph<{ pools: GraphPool[] }>(query, { tokenIn, tokenOut });
  if (!data?.pools) {
    throw new Error('No routing options found');
  }

  // Calculate optimal route based on pool states
  const route = calculateOptimalRoute(data.pools, tokenIn, tokenOut, amount);

  return route;
}

// Helper functions for calculations
function calculateOptimalEntry(
  pool: GraphPool,
  amount: string,
): GraphPositionManagement['optimalEntry'] {
  // Convert amount to BigInt for precise calculations
  const amountIn = BigInt(amount);
  const sqrtPrice = BigInt(pool.sqrtPrice);
  const liquidity = BigInt(pool.liquidity);

  // Calculate optimal token amounts based on current pool state
  const token0Decimals = BigInt(10 ** pool.token0.decimals);
  const token1Decimals = BigInt(10 ** pool.token1.decimals);

  // Calculate optimal ratio based on current price
  const price = (sqrtPrice * sqrtPrice) >> BigInt(96);
  const optimalToken0Amount = (amountIn * token0Decimals) / (price + token0Decimals);
  const optimalToken1Amount = (amountIn * token1Decimals) / (price + token1Decimals);

  // Calculate expected slippage
  const slippage = calculateSlippage(amountIn, liquidity, price);

  return {
    token0Amount: optimalToken0Amount.toString(),
    token1Amount: optimalToken1Amount.toString(),
    slippage: slippage.toString(),
  };
}

function calculateOptimalExit(
  pool: GraphPool,
  amount: string,
): GraphPositionManagement['optimalExit'] {
  // Convert amount to BigInt for precise calculations
  const amountIn = BigInt(amount);
  const sqrtPrice = BigInt(pool.sqrtPrice);
  const liquidity = BigInt(pool.liquidity);

  // Calculate optimal token amounts for exit
  const token0Decimals = BigInt(10 ** pool.token0.decimals);
  const token1Decimals = BigInt(10 ** pool.token1.decimals);

  // Calculate optimal ratio based on current price
  const price = (sqrtPrice * sqrtPrice) >> BigInt(96);
  const optimalToken0Amount = (amountIn * token0Decimals) / (price + token0Decimals);
  const optimalToken1Amount = (amountIn * token1Decimals) / (price + token1Decimals);

  // Calculate expected slippage
  const slippage = calculateSlippage(amountIn, liquidity, price);

  return {
    token0Amount: optimalToken0Amount.toString(),
    token1Amount: optimalToken1Amount.toString(),
    slippage: slippage.toString(),
  };
}

function calculateBribeStrategy(gauge: GraphGauge): GraphBribeStrategy {
  if (!gauge.bribes || gauge.bribes.length === 0) {
    return {
      roi: '0',
      optimalAmount: '0',
      timing: '0',
    };
  }

  // Calculate total voting power and average APR
  const totalVotingPower = BigInt(gauge.votingPower);
  let totalApr = BigInt(0);
  let totalAmount = BigInt(0);

  for (const bribe of gauge.bribes) {
    totalApr += BigInt(bribe.apr);
    totalAmount += BigInt(bribe.amount);
  }

  const averageApr = totalApr / BigInt(gauge.bribes.length);

  // Calculate optimal bribe amount based on voting power and APR
  const optimalAmount = (totalVotingPower * averageApr) / BigInt(10000);

  // Calculate ROI (assuming 1 week period)
  const roi = (optimalAmount * BigInt(52)) / totalAmount;

  // Calculate optimal timing (next epoch)
  const currentTime = BigInt(Math.floor(Date.now() / 1000));
  const epochLength = BigInt(7 * 24 * 60 * 60); // 1 week in seconds
  const nextEpoch = (currentTime / epochLength + BigInt(1)) * epochLength;

  return {
    roi: roi.toString(),
    optimalAmount: optimalAmount.toString(),
    timing: nextEpoch.toString(),
  };
}

function calculateOptimalRoute(
  pools: GraphPool[],
  tokenIn: string,
  tokenOut: string,
  amount: string,
): GraphRouting {
  if (pools.length === 0) {
    return {
      path: [],
      expectedOutput: '0',
      gasCost: '0',
    };
  }

  // Convert amount to BigInt for precise calculations
  const amountIn = BigInt(amount);
  let bestOutput = BigInt(0);
  let bestPath: string[] = [];
  let bestGasCost = BigInt(0);

  // Find direct pool if it exists
  const directPool = pools.find(
    (pool) =>
      (pool.token0.id.toLowerCase() === tokenIn.toLowerCase() &&
        pool.token1.id.toLowerCase() === tokenOut.toLowerCase()) ||
      (pool.token0.id.toLowerCase() === tokenOut.toLowerCase() &&
        pool.token1.id.toLowerCase() === tokenIn.toLowerCase()),
  );

  if (directPool) {
    // Calculate direct swap output
    const output = calculateSwapOutput(directPool, amountIn, tokenIn);
    const gasCost = BigInt(21000); // Base gas cost for direct swap

    if (output > bestOutput) {
      bestOutput = output;
      bestPath = [directPool.id];
      bestGasCost = gasCost;
    }
  }

  // Find potential multi-hop routes
  for (const pool1 of pools) {
    if (
      pool1.token0.id.toLowerCase() === tokenIn.toLowerCase() ||
      pool1.token1.id.toLowerCase() === tokenIn.toLowerCase()
    ) {
      const intermediateToken =
        pool1.token0.id.toLowerCase() === tokenIn.toLowerCase() ? pool1.token1.id : pool1.token0.id;

      for (const pool2 of pools) {
        if (
          (pool2 !== pool1 &&
            pool2.token0.id.toLowerCase() === intermediateToken.toLowerCase() &&
            pool2.token1.id.toLowerCase() === tokenOut.toLowerCase()) ||
          (pool2.token0.id.toLowerCase() === tokenOut.toLowerCase() &&
            pool2.token1.id.toLowerCase() === intermediateToken.toLowerCase())
        ) {
          // Calculate two-hop swap output
          const intermediateOutput = calculateSwapOutput(pool1, amountIn, tokenIn);
          const finalOutput = calculateSwapOutput(pool2, intermediateOutput, intermediateToken);
          const gasCost = BigInt(42000); // Gas cost for two-hop swap

          if (finalOutput > bestOutput) {
            bestOutput = finalOutput;
            bestPath = [pool1.id, pool2.id];
            bestGasCost = gasCost;
          }
        }
      }
    }
  }

  return {
    path: bestPath,
    expectedOutput: bestOutput.toString(),
    gasCost: bestGasCost.toString(),
  };
}

// Helper functions for calculations
function calculateSlippage(amount: bigint, liquidity: bigint, _price: bigint): bigint {
  // Calculate price impact
  const priceImpact = (amount * BigInt(10000)) / liquidity;

  // Convert to basis points (1% = 100 basis points)
  return priceImpact;
}

function calculateSwapOutput(pool: GraphPool, amountIn: bigint, tokenIn: string): bigint {
  const sqrtPrice = BigInt(pool.sqrtPrice);
  const _liquidity = BigInt(pool.liquidity);

  // Determine if tokenIn is token0 or token1
  const isToken0 = pool.token0.id.toLowerCase() === tokenIn.toLowerCase();
  const tokenDecimals = isToken0
    ? BigInt(10 ** pool.token0.decimals)
    : BigInt(10 ** pool.token1.decimals);

  // Calculate price
  const price = (sqrtPrice * sqrtPrice) >> BigInt(96);

  // Calculate output amount
  const amountOut = isToken0
    ? (amountIn * tokenDecimals) / price
    : (amountIn * price) / tokenDecimals;

  return amountOut;
}
