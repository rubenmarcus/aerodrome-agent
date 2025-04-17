import { CONTRACTS, VOTING_ESCROW_ABI } from '@/lib/contracts';
import { NextResponse } from 'next/server';
import { encodeFunctionData } from 'viem';

export async function POST() {
  try {
    // Generate withdraw transaction
    const data = encodeFunctionData({
      abi: VOTING_ESCROW_ABI,
      functionName: 'withdraw',
    });

    return NextResponse.json({
      to: CONTRACTS.VOTING_ESCROW,
      data,
    });
  } catch (error) {
    console.error('Error generating withdraw transaction:', error);
    return NextResponse.json({ error: 'Failed to generate withdraw transaction' }, { status: 500 });
  }
}
