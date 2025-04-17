import { NextResponse } from 'next/server';
import { encodeFunctionData } from 'viem';
import { GAUGE_CONTROLLER_ABI, CONTRACTS } from '@/app/lib/contracts';

export async function POST(request: Request) {
  try {
    const { gaugeAddress, weight } = await request.json();

    if (!gaugeAddress || !weight) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    // Generate vote transaction
    const data = encodeFunctionData({
      abi: GAUGE_CONTROLLER_ABI,
      functionName: 'vote_for_gauge_weights',
      args: [gaugeAddress, BigInt(weight)]
    });

    return NextResponse.json({
      to: CONTRACTS.GAUGE_CONTROLLER,
      data
    });
  } catch (error) {
    console.error('Error generating vote transaction:', error);
    return NextResponse.json(
      { error: 'Failed to generate vote transaction' },
      { status: 500 }
    );
  }
}