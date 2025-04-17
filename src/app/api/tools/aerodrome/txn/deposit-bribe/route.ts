import { AERODROME_ABI } from '@/config/contracts';
import { CONTRACTS } from '@/lib/contracts';
import { NextResponse } from 'next/server';
import { encodeFunctionData } from 'viem';

export async function POST(request: Request) {
  try {
    const { gaugeAddress, tokenAddress, amount } = await request.json();

    if (!gaugeAddress || !tokenAddress || !amount) {
      return NextResponse.json(
        { error: 'Gauge address, token address, and amount are required' },
        { status: 400 },
      );
    }

    const data = encodeFunctionData({
      abi: AERODROME_ABI.BRIBE,
      functionName: 'depositBribe',
      args: [tokenAddress as `0x${string}`, BigInt(amount)],
    });

    return NextResponse.json({
      to: CONTRACTS.BRIBE_FACTORY,
      data,
    });
  } catch (error) {
    console.error('Error generating deposit bribe transaction:', error);
    return NextResponse.json(
      { error: 'Failed to generate deposit bribe transaction' },
      { status: 500 },
    );
  }
}
