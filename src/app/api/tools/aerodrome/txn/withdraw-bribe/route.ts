import { AERODROME_ABI } from '@/config/contracts';
import { CONTRACTS } from '@/lib/contracts';
import { NextResponse } from 'next/server';
import { encodeFunctionData } from 'viem';

export async function POST(request: Request) {
  try {
    const { gaugeAddress, tokenAddress } = await request.json();

    if (!gaugeAddress || !tokenAddress) {
      return NextResponse.json(
        { error: 'Gauge address and token address are required' },
        { status: 400 },
      );
    }

    const data = encodeFunctionData({
      abi: AERODROME_ABI.BRIBE,
      functionName: 'withdrawBribe',
      args: [tokenAddress as `0x${string}`],
    });

    return NextResponse.json({
      to: CONTRACTS.BRIBE_FACTORY,
      data,
    });
  } catch (error) {
    console.error('Error generating withdraw bribe transaction:', error);
    return NextResponse.json(
      { error: 'Failed to generate withdraw bribe transaction' },
      { status: 500 },
    );
  }
}
