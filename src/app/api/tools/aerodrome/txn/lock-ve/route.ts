import { NextResponse } from 'next/server';
import { parseEther, encodeFunctionData } from 'viem';
import { VOTING_ESCROW_ABI, CONTRACTS } from '@/lib/contracts';

export async function POST(request: Request) {
  try {
    const { amount, unlockTime } = await request.json();

    if (!amount || !unlockTime) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    // Convert amount to wei
    const amountWei = parseEther(amount.toString());

    // Generate lock transaction
    const data = encodeFunctionData({
      abi: VOTING_ESCROW_ABI,
      functionName: 'create_lock',
      args: [amountWei, BigInt(unlockTime)]
    });

    return NextResponse.json({
      to: CONTRACTS.VOTING_ESCROW,
      data
    });
  } catch (error) {
    console.error('Error generating lock transaction:', error);
    return NextResponse.json(
      { error: 'Failed to generate lock transaction' },
      { status: 500 }
    );
  }
}