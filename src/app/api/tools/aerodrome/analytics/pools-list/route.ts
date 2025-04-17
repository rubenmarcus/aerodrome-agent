import { getPools } from '@/utils/graph';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const tokenAddress = searchParams.get('token');
    const minLiquidity = searchParams.get('minLiquidity');
    const minVolume = searchParams.get('minVolume');
    const feeTier = searchParams.get('feeTier');
    const limit = searchParams.get('limit') || '5';
    const sortBy = searchParams.get('sortBy') || 'liquidity';
    const sortOrder = searchParams.get('sortOrder') || 'desc';

    // Get pools from The Graph
    const pools = await getPools({
      token: tokenAddress || undefined,
      minLiquidity: minLiquidity || undefined,
      minVolume: minVolume || undefined,
      feeTier: feeTier || undefined,
      limit: Number(limit),
      sortBy: sortBy as 'liquidity' | 'volume',
      sortOrder: sortOrder as 'asc' | 'desc',
    });

    return NextResponse.json({
      pools,
      total: pools.length,
      limit: Number(limit),
    });
  } catch (error) {
    console.error('Error getting pools list:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to get pools list' },
      { status: 500 },
    );
  }
}
