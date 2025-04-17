import { NextResponse } from 'next/server';
import { encodeFunctionData } from 'viem';
import { GAUGE_ABI } from '@/lib/contracts';

export async function POST(request: Request) {
  try {
    const { gaugeAddress, tokenAddress } = await request.json();

    if (!gaugeAddress || !tokenAddress) {
      return NextResponse.json(
        { error: 'Gauge address and token address are required' },
        { status: 400 }
      );
    }

    const data = encodeFunctionData({
      abi: GAUGE_ABI,
      functionName: 'withdrawBribe',
      args: [tokenAddress as `0x${string}`],
    });

    return NextResponse.json({
      to: gaugeAddress as `0x${string}`,
      data,
    });
  } catch (error) {
    console.error('Error generating withdraw bribe transaction:', error);
    return NextResponse.json(
      { error: 'Failed to generate withdraw bribe transaction' },
      { status: 500 }
    );
  }
}
