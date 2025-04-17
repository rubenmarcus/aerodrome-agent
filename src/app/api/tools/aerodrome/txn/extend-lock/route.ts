import { NextResponse } from 'next/server';
import { encodeFunctionData } from 'viem';
import { VOTING_ESCROW_ABI, CONTRACTS } from '@/lib/contracts';

export async function POST(request: Request) {
  try {
    const { unlockTime } = await request.json();

    if (!unlockTime) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    // Generate extend lock transaction
    const data = encodeFunctionData({
      abi: VOTING_ESCROW_ABI,
      functionName: 'increase_unlock_time',
      args: [BigInt(unlockTime)]
    });

    return NextResponse.json({
      to: CONTRACTS.VOTING_ESCROW,
      data
    });
  } catch (error) {
    console.error('Error generating extend lock transaction:', error);
    return NextResponse.json(
      { error: 'Failed to generate extend lock transaction' },
      { status: 500 }
    );
  }
}