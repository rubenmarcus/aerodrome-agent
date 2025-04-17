import { ERC20_ABI, POOL_ABI } from '@/lib/contracts';
import { publicClient } from '@/lib/viem';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const poolAddress = searchParams.get('poolAddress');
    const amount = searchParams.get('amount');
    const action = searchParams.get('action') as 'enter' | 'exit';

    if (!poolAddress || !amount || !action) {
      return NextResponse.json(
        { error: 'Pool address, amount, and action are required' },
        { status: 400 },
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

    // Calculate optimal amounts based on action
    let token0Amount;
    let token1Amount;
    if (action === 'enter') {
      // Calculate optimal entry amounts to maintain pool ratio
      const amountNum = Number(amount);
      const totalValue = Number(reserve0) + Number(reserve1);
      token0Amount = (amountNum * Number(reserve0)) / totalValue;
      token1Amount = (amountNum * Number(reserve1)) / totalValue;
    } else {
      // Calculate exit amounts based on LP share
      const lpShare = Number(amount) / Number(totalSupply);
      token0Amount = Number(reserve0) * lpShare;
      token1Amount = Number(reserve1) * lpShare;
    }

    // Calculate slippage (simplified)
    const slippage = 0.005; // 0.5% default slippage

    // Calculate price impact (simplified)
    const priceImpact =
      action === 'enter' ? (Number(amount) / Number(reserve0 + reserve1)) * 100 : 0;

    return NextResponse.json({
      poolAddress,
      action,
      tokens: {
        token0: {
          address: token0,
          symbol: token0Symbol,
          decimals: Number(token0Decimals),
          amount: token0Amount.toString(),
        },
        token1: {
          address: token1,
          symbol: token1Symbol,
          decimals: Number(token1Decimals),
          amount: token1Amount.toString(),
        },
      },
      metrics: {
        slippage: slippage.toString(),
        priceImpact: priceImpact.toString(),
        poolReserves: {
          token0: reserve0.toString(),
          token1: reserve1.toString(),
        },
      },
      recommendations: [
        action === 'enter'
          ? 'Consider splitting entry into multiple smaller transactions to minimize price impact'
          : 'Monitor pool health before exiting to avoid high slippage',
        'Set appropriate slippage tolerance based on market conditions',
        'Consider timing the transaction during periods of lower volatility',
      ],
    });
  } catch (error) {
    console.error('Error getting position management:', error);
    return NextResponse.json({ error: 'Failed to get position management' }, { status: 500 });
  }
}
