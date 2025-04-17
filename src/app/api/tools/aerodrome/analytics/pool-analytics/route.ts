import { NextResponse } from 'next/server';
import { publicClient } from '@/app/lib/viem';
import { POOL_ABI, ERC20_ABI } from '@/app/lib/contracts';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const poolAddress = searchParams.get('poolAddress');

    if (!poolAddress) {
      return NextResponse.json(
        { error: 'Pool address is required' },
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

    // Get token info
    const [token0Symbol, token0Decimals, token1Symbol, token1Decimals] = await Promise.all([
      publicClient.readContract({
        address: token0 as `0x${string}`,
        abi: ERC20_ABI,
        functionName: 'symbol',
      }),
      publicClient.readContract({
        address: token0 as `0x${string}`,
        abi: ERC20_ABI,
        functionName: 'decimals',
      }),
      publicClient.readContract({
        address: token1 as `0x${string}`,
        abi: ERC20_ABI,
        functionName: 'symbol',
      }),
      publicClient.readContract({
        address: token1 as `0x${string}`,
        abi: ERC20_ABI,
        functionName: 'decimals',
      }),
    ]);

    // Calculate TVL (simplified - would use price oracle in real implementation)
    const tvl = (reserve0 + reserve1) / 1000000000000000000n;

    // Calculate volume (placeholder - would get from The Graph in real implementation)
    const volume24h = 0n;
    const fees24h = 0n;

    // Calculate APR (placeholder - would calculate based on trading volume and fees)
    const apr = 0;

    // Calculate impermanent loss risk (simplified)
    const impermanentLossRisk = 'Low'; // Would calculate based on token volatility

    return NextResponse.json({
      poolAddress,
      tokens: {
        token0: {
          address: token0,
          symbol: token0Symbol,
          decimals: Number(token0Decimals),
          reserve: reserve0.toString(),
        },
        token1: {
          address: token1,
          symbol: token1Symbol,
          decimals: Number(token1Decimals),
          reserve: reserve1.toString(),
        },
      },
      metrics: {
        tvl: tvl.toString(),
        volume24h: volume24h.toString(),
        fees24h: fees24h.toString(),
        totalSupply: totalSupply.toString(),
        apr,
        impermanentLossRisk,
      },
      price: {
        token0: (reserve1 * 1000000000000000000n) / reserve0,
        token1: (reserve0 * 1000000000000000000n) / reserve1,
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