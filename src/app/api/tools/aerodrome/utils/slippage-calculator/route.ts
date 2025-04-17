import { POOL_ABI } from '@/lib/contracts';
import { publicClient } from '@/lib/viem';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const poolAddress = searchParams.get('poolAddress');
    const amount = searchParams.get('amount');
    const tokenIn = searchParams.get('tokenIn');

    if (!poolAddress || !amount || !tokenIn) {
      return NextResponse.json(
        { error: 'Pool address, amount, and tokenIn are required' },
        { status: 400 },
      );
    }

    // Get pool reserves
    const [reserve0, reserve1] = await publicClient.readContract({
      address: poolAddress as `0x${string}`,
      abi: POOL_ABI,
      functionName: 'getReserves',
    });

    // Calculate price impact
    const amountIn = BigInt(amount);
    const reserves = tokenIn === '0' ? reserve0 : reserve1;
    const otherReserves = tokenIn === '0' ? reserve1 : reserve0;

    const priceImpact = (amountIn * 10000n) / (reserves + amountIn);
    const expectedOutput = (amountIn * otherReserves) / (reserves + amountIn);

    return NextResponse.json({
      priceImpact: Number(priceImpact) / 100,
      expectedOutput: expectedOutput.toString(),
      reserves: {
        tokenIn: reserves.toString(),
        tokenOut: otherReserves.toString(),
      },
    });
  } catch (error) {
    console.error('Error calculating slippage:', error);
    return NextResponse.json({ error: 'Failed to calculate slippage' }, { status: 500 });
  }
}
