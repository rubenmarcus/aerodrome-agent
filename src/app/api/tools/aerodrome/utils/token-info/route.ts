import { NextResponse } from 'next/server';
import { publicClient } from '@/lib/viem';
import { ERC20_ABI } from '@/lib/contracts';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const tokenAddress = searchParams.get('address');

    if (!tokenAddress) {
      return NextResponse.json(
        { error: 'Token address is required' },
        { status: 400 }
      );
    }

    // Get token info
    const [symbol, decimals] = await Promise.all([
      publicClient.readContract({
        address: tokenAddress as `0x${string}`,
        abi: ERC20_ABI,
        functionName: 'symbol',
      }),
      publicClient.readContract({
        address: tokenAddress as `0x${string}`,
        abi: ERC20_ABI,
        functionName: 'decimals',
      }),
    ]);

    return NextResponse.json({
      address: tokenAddress,
      symbol,
      decimals: Number(decimals),
    });
  } catch (error) {
    console.error('Error getting token info:', error);
    return NextResponse.json(
      { error: 'Failed to get token info' },
      { status: 500 }
    );
  }
}