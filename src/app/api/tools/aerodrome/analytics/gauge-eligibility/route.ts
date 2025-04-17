import { POOL_ABI } from '@/lib/contracts';
import { publicClient } from '@/lib/viem';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const poolAddress = searchParams.get('poolAddress');

    if (!poolAddress) {
      return NextResponse.json({ error: 'Pool address is required' }, { status: 400 });
    }

    const [totalSupply, token0, token1] = await Promise.all([
      publicClient.readContract({
        address: poolAddress as `0x${string}`,
        abi: POOL_ABI,
        functionName: 'totalSupply',
      }),
      publicClient.readContract({
        address: poolAddress as `0x${string}`,
        abi: POOL_ABI,
        functionName: 'token0',
      }),
      publicClient.readContract({
        address: poolAddress as `0x${string}`,
        abi: POOL_ABI,
        functionName: 'token1',
      }),
    ]);

    return NextResponse.json({
      poolAddress,
      totalSupply: (totalSupply as bigint).toString(),
      tokens: {
        token0,
        token1,
      },
      eligibility: {
        hasEnoughLiquidity: Number(totalSupply) > 0,
        isStablePool: false, // Would need to check if tokens are stablecoins
        meetsMinimumTVL: Number(totalSupply) > 1000000, // Example threshold
      },
    });
  } catch (error) {
    console.error('Error getting gauge eligibility:', error);
    return NextResponse.json({ error: 'Failed to get gauge eligibility' }, { status: 500 });
  }
}
