import { POOL_ABI } from '@/lib/contracts';
import { publicClient } from '@/lib/viem';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const poolAddress = searchParams.get('poolAddress');
    const tokenIn = searchParams.get('tokenIn');
    const amountIn = searchParams.get('amountIn');

    if (!poolAddress || !tokenIn || !amountIn) {
      return NextResponse.json(
        { error: 'Pool address, tokenIn, and amountIn are required' },
        { status: 400 },
      );
    }

    // Get pool reserves
    const [reserve0, reserve1] = await publicClient.readContract({
      address: poolAddress as `0x${string}`,
      abi: POOL_ABI,
      functionName: 'getReserves',
    });

    // Calculate output amount
    const amountInWei = BigInt(amountIn);
    const reservesIn = tokenIn === '0' ? reserve0 : reserve1;
    const reservesOut = tokenIn === '0' ? reserve1 : reserve0;

    // Calculate price impact
    const priceImpact = (amountInWei * 10000n) / (reservesIn + amountInWei);

    // Calculate output amount using constant product formula
    const amountOut = (amountInWei * reservesOut) / (reservesIn + amountInWei);

    return NextResponse.json({
      poolAddress,
      tokenIn,
      amountIn: amountInWei.toString(),
      amountOut: amountOut.toString(),
      priceImpact: Number(priceImpact) / 100,
      reserves: {
        tokenIn: reservesIn.toString(),
        tokenOut: reservesOut.toString(),
      },
    });
  } catch (error) {
    console.error('Error simulating swap:', error);
    return NextResponse.json({ error: 'Failed to simulate swap' }, { status: 500 });
  }
}
