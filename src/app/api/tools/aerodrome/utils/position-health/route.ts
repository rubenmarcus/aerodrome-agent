import { NextResponse } from 'next/server';
import { publicClient } from '@/app/lib/viem';
import { POOL_ABI, ERC20_ABI } from '@/app/lib/contracts';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const poolAddress = searchParams.get('poolAddress');
    const positionAddress = searchParams.get('positionAddress');

    if (!poolAddress || !positionAddress) {
      return NextResponse.json(
        { error: 'Pool address and position address are required' },
        { status: 400 }
      );
    }

    // Get pool info
    const [reserves, totalSupply, token0, token1] = await Promise.all([
      publicClient.readContract({
        address: poolAddress as `0x${string}`,
        abi: POOL_ABI,
        functionName: 'getReserves',
      }),
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

    const [reserve0, reserve1] = reserves as unknown as [bigint, bigint];

    // Get position LP balance
    const lpBalance = await publicClient.readContract({
      address: poolAddress as `0x${string}`,
      abi: ERC20_ABI,
      functionName: 'balanceOf',
      args: [positionAddress as `0x${string}`],
    });

    // Calculate position share
    const positionShare = Number((lpBalance * 10000n) / totalSupply);

    // Calculate token amounts
    const token0Amount = (reserve0 * BigInt(positionShare)) / 10000n;
    const token1Amount = (reserve1 * BigInt(positionShare)) / 10000n;

    // Get token prices (simplified - in a real implementation you'd use a price oracle)
    const token0Price = 1n; // Placeholder
    const token1Price = 1n; // Placeholder

    // Calculate position value
    const positionValue = (token0Amount * token0Price + token1Amount * token1Price) / 1000000000000000000n;

    // Calculate health metrics
    const healthScore = 100; // Placeholder - in real implementation would consider various factors
    const impermanentLoss = 0; // Placeholder - would calculate based on entry price vs current price

    return NextResponse.json({
      poolAddress,
      positionAddress,
      lpBalance: lpBalance.toString(),
      positionShare: positionShare / 100,
      tokenAmounts: {
        token0: {
          address: token0,
          amount: token0Amount.toString(),
        },
        token1: {
          address: token1,
          amount: token1Amount.toString(),
        },
      },
      positionValue: positionValue.toString(),
      healthScore,
      impermanentLoss,
      recommendations: [], // Would provide recommendations based on health metrics
    });
  } catch (error) {
    console.error('Error checking position health:', error);
    return NextResponse.json(
      { error: 'Failed to check position health' },
      { status: 500 }
    );
  }
}