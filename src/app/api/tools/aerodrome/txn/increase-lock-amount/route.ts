import { CONTRACTS, VOTING_ESCROW_ABI } from '@/lib/contracts';
import { NextResponse } from 'next/server';
import { encodeFunctionData, parseEther } from 'viem';

export async function POST(request: Request) {
  try {
    const { amount } = await request.json();

    if (!amount) {
      return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
    }

    // Convert amount to wei
    const amountWei = parseEther(amount.toString());

    // Generate increase lock amount transaction
    const data = encodeFunctionData({
      abi: VOTING_ESCROW_ABI,
      functionName: 'increase_amount',
      args: [amountWei],
    });

    return NextResponse.json({
      to: CONTRACTS.VOTING_ESCROW,
      data,
    });
  } catch (error) {
    console.error('Error generating increase lock amount transaction:', error);
    return NextResponse.json(
      { error: 'Failed to generate increase lock amount transaction' },
      { status: 500 },
    );
  }
}
