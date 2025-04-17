import { ERC20_ABI } from '@/lib/contracts';
import { publicClient } from '@/lib/viem';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const token0Address = searchParams.get('token0');
    const token1Address = searchParams.get('token1');

    if (!token0Address || !token1Address) {
      return NextResponse.json({ error: 'Both token addresses are required' }, { status: 400 });
    }

    const [token0Symbol, token1Symbol, token0Decimals, token1Decimals] = await Promise.all([
      publicClient.readContract({
        address: token0Address as `0x${string}`,
        abi: ERC20_ABI,
        functionName: 'symbol',
      }),
      publicClient.readContract({
        address: token1Address as `0x${string}`,
        abi: ERC20_ABI,
        functionName: 'symbol',
      }),
      publicClient.readContract({
        address: token0Address as `0x${string}`,
        abi: ERC20_ABI,
        functionName: 'decimals',
      }),
      publicClient.readContract({
        address: token1Address as `0x${string}`,
        abi: ERC20_ABI,
        functionName: 'decimals',
      }),
    ]);

    return NextResponse.json({
      tokens: {
        token0: {
          address: token0Address,
          symbol: token0Symbol,
          decimals: Number(token0Decimals),
        },
        token1: {
          address: token1Address,
          symbol: token1Symbol,
          decimals: Number(token1Decimals),
        },
      },
      recommendations: {
        initialLiquidity: '1000', // Example value
        feeTier: '0.3%', // Example value
        priceRange: '±1%', // Example value
      },
    });
  } catch (error) {
    console.error('Error getting pool creation info:', error);
    return NextResponse.json({ error: 'Failed to get pool creation info' }, { status: 500 });
  }
}
