import { NextResponse } from 'next/server';
import { getPools } from '@/utils/graph';

function getTokenAddress(token: string): string {
  // If it's already an address, return it
  if (token.startsWith('0x')) {
    return token.toLowerCase();
  }
  // Otherwise return the input as is (could be a symbol or other identifier)
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
        { status: 400 }
      );
    }

    let pools;
    if (poolId) {
      // If poolId is provided, try to get the pool directly
      pools = await getPools({
        token: poolId,
        limit: 1,
      });
    } else if (token0 && token1) {
      // Convert token symbols to addresses if needed
      const token0Address = getTokenAddress(token0);
      const token1Address = getTokenAddress(token1);

      // Search for pools containing token0
      pools = await getPools({
        token: token0Address,
        limit: 100, // Get more pools to ensure we find the right pair
      });

      // Find the pool that contains both tokens
      pools = pools.filter(pool =>
        (pool.token0.id.toLowerCase() === token0Address &&
         pool.token1.id.toLowerCase() === token1Address) ||
        (pool.token0.id.toLowerCase() === token1Address &&
         pool.token1.id.toLowerCase() === token0Address)
      );
    }

    if (!pools || pools.length === 0) {
      return NextResponse.json(
        { error: 'Pool not found for the specified tokens' },
        { status: 404 }
      );
    }

    const pool = pools[0];

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
    return NextResponse.json(
      { error: 'Failed to get pool analytics' },
      { status: 500 }
    );
  }
}