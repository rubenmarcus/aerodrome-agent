import { NextResponse } from 'next/server';
import { encodeFunctionData } from 'viem';
import { GAUGE_ABI } from '@/lib/contracts';

export async function POST(request: Request) {
  try {
    const { gaugeAddress } = await request.json();

    if (!gaugeAddress) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    // Generate claim rewards transaction
    const data = encodeFunctionData({
      abi: GAUGE_ABI,
      functionName: 'getReward',
      args: []
    });

    return NextResponse.json({
      to: gaugeAddress,
      data
    });
  } catch (error) {
    console.error('Error generating claim rewards transaction:', error);
    return NextResponse.json(
      { error: 'Failed to generate claim rewards transaction' },
      { status: 500 }
    );
  }
}