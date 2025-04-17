import { ERC20_ABI, POOL_ABI } from '@/lib/contracts';
import { publicClient } from '@/lib/viem';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const poolAddress = searchParams.get('poolAddress');

    if (!poolAddress) {
      return NextResponse.json({ error: 'Pool address is required' }, { status: 400 });
    }

    const [reserves, token0, token1] = await Promise.all([
      publicClient.readContract({
        address: poolAddress as `0x${string}`,
        abi: POOL_ABI,
        functionName: 'getReserves',
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

    const [token0Symbol, token1Symbol] = await Promise.all([
      publicClient.readContract({
        address: token0 as `0x${string}`,
        abi: ERC20_ABI,
        functionName: 'symbol',
      }),
      publicClient.readContract({
        address: token1 as `0x${string}`,
        abi: ERC20_ABI,
        functionName: 'symbol',
      }),
    ]);

    return NextResponse.json({
      poolAddress,
      reserves: {
        token0: (reserves[0] as bigint).toString(),
        token1: (reserves[1] as bigint).toString(),
      },
      tokens: {
        token0: {
          address: token0,
          symbol: token0Symbol,
        },
        token1: {
          address: token1,
          symbol: token1Symbol,
        },
      },
    });
  } catch (error) {
    console.error('Error getting fee collection info:', error);
    return NextResponse.json({ error: 'Failed to get fee collection info' }, { status: 500 });
  }
}
