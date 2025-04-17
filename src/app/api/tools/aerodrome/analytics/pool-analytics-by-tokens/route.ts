import { getPools } from '@/utils/graph';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const token0 = searchParams.get('token0');
    const token1 = searchParams.get('token1');

    if (!token0 || !token1) {
      return NextResponse.json({ error: 'Both token0 and token1 are required' }, { status: 400 });
    }

    // First, try to find the pool by token addresses
    const pools = await getPools({
      token: token0,
      limit: 100, // Get more pools to ensure we find the right pair
    });

    // Find the pool that contains both tokens
    const pool = pools.find(
      (pool) =>
        (pool.token0.id.toLowerCase() === token0.toLowerCase() &&
          pool.token1.id.toLowerCase() === token1.toLowerCase()) ||
        (pool.token0.id.toLowerCase() === token1.toLowerCase() &&
          pool.token1.id.toLowerCase() === token0.toLowerCase()),
    );

    if (!pool) {
      return NextResponse.json(
        { error: 'Pool not found for the specified token pair' },
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
    console.error('Error getting pool analytics by tokens:', error);
    return NextResponse.json({ error: 'Failed to get pool analytics' }, { status: 500 });
  }
}
