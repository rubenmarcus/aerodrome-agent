import { NextResponse } from 'next/server';
import { parseEther, encodeFunctionData } from 'viem';
import { VOTING_ESCROW_ABI, CONTRACTS } from '@/lib/contracts';

export async function POST(request: Request) {
  try {
    const { amount } = await request.json();

    if (!amount) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    // Convert amount to wei
    const amountWei = parseEther(amount.toString());

    // Generate increase lock amount transaction
    const data = encodeFunctionData({
      abi: VOTING_ESCROW_ABI,
      functionName: 'increase_amount',
      args: [amountWei]
    });

    return NextResponse.json({
      to: CONTRACTS.VOTING_ESCROW,
      data
    });
  } catch (error) {
    console.error('Error generating increase lock amount transaction:', error);
    return NextResponse.json(
      { error: 'Failed to generate increase lock amount transaction' },
      { status: 500 }
    );
  }
}