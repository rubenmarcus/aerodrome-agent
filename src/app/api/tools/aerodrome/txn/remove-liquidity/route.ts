import { NextResponse } from 'next/server';
import { encodeFunctionData } from 'viem';
import { POOL_ABI } from '@/lib/contracts';

export async function POST(request: Request) {
  try {
    const { poolAddress, token0, token1, amount, minAmount0, minAmount1, to, deadline } = await request.json();

    if (!poolAddress || !token0 || !token1 || !amount || !minAmount0 || !minAmount1 || !to) {
      return NextResponse.json(
        { error: 'Pool address, tokens, amount, minimum amounts, and recipient address are required' },
        { status: 400 }
      );
    }

    const data = encodeFunctionData({
      abi: POOL_ABI,
      functionName: 'removeLiquidity',
      args: [
        token0 as `0x${string}`,
        token1 as `0x${string}`,
        BigInt(amount),
        BigInt(minAmount0),
        BigInt(minAmount1),
      ],
    });

    return NextResponse.json({
      to: poolAddress as `0x${string}`,
      data,
    });
  } catch (error) {
    console.error('Error generating remove liquidity transaction:', error);
    return NextResponse.json(
      { error: 'Failed to generate remove liquidity transaction' },
      { status: 500 }
    );
  }
}