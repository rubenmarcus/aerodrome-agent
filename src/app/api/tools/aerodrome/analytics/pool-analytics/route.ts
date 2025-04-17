import { getPool, getPools } from '@/utils/graph';
import { NextResponse } from 'next/server';

async function getTokenAddress(token: string): Promise<string> {
  // If it's already an address, return it
  if (token.startsWith('0x')) {
    return token.toLowerCase();
  }

  // Search for the token in pools to get its address
  const pools = await getPools({
    token: token.toLowerCase(),
    limit: 10, // Get more pools to increase chance of finding the token
  });

  if (pools && pools.length > 0) {
    // Check all pools for the token
    for (const pool of pools) {
      if (pool.token0.symbol.toLowerCase() === token.toLowerCase()) {
        return pool.token0.id.toLowerCase();
      }
      if (pool.token1.symbol.toLowerCase() === token.toLowerCase()) {
        return pool.token1.id.toLowerCase();
      }
    }
  }

  // If we couldn't find the token, return the input as is
  return token.toLowerCase();
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const poolId = searchParams.get('poolId');
    const token0 = searchParams.get('token0');
    const token1 = searchParams.get('token1');

    // Validate input parameters
    if (!poolId && (!token0 || !token1)) {
      return NextResponse.json(
        { error: 'Either poolId or both token0 and token1 are required' },
        { status: 400 },
      );
    }

    let pool;
    if (poolId) {
      // First try to get the pool directly using the pool query
      pool = await getPool(poolId);

      // If no pool found and poolId contains a separator, try splitting it into tokens
      if (!pool && (poolId.includes('-') || poolId.includes('/'))) {
        const separator = poolId.includes('-') ? '-' : '/';
        const [token0FromId, token1FromId] = poolId.split(separator);
        const token0Address = await getTokenAddress(token0FromId);
        const token1Address = await getTokenAddress(token1FromId);

        console.log('Searching for pool with tokens:', {
          token0: token0Address,
          token1: token1Address,
        });

        // Search for pools containing both tokens
        const pools = await getPools({
          token0: token0Address,
          token1: token1Address,
          limit: 1,
        });

        if (pools && pools.length > 0) {
          pool = pools[0];
        }
      }
    } else if (token0 && token1) {
      // Convert token symbols to addresses if needed
      const token0Address = await getTokenAddress(token0);
      const token1Address = await getTokenAddress(token1);

      console.log('Searching for pool with tokens:', {
        token0: token0Address,
        token1: token1Address,
      });

      // Search for pools containing both tokens
      const pools = await getPools({
        token0: token0Address,
        token1: token1Address,
        limit: 1,
      });

      if (pools && pools.length > 0) {
        pool = pools[0];
      }
    }

    if (!pool) {
      return NextResponse.json(
        { error: 'Pool not found for the specified tokens' },
        { status: 404 },
      );
    }

    return NextResponse.json({
      poolAddress: pool.id,
      tvl: pool.totalValueLockedUSD,
      apr: pool.apr,
      tokens: {
        token0: {
          address: pool.token0.id,
          symbol: pool.token0.symbol,
        },
        token1: {
          address: pool.token1.id,
          symbol: pool.token1.symbol,
        },
      },
    });
  } catch (error) {
    console.error('Error getting pool analytics:', error);
    return NextResponse.json({ error: 'Failed to get pool analytics' }, { status: 500 });
  }
}
