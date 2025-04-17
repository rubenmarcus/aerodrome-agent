import { VOTING_ESCROW_ABI } from '@/lib/contracts';
import { NextResponse } from 'next/server';
import { encodeFunctionData } from 'viem';

export async function POST(request: Request) {
  try {
    const { fromTokenId, toTokenId } = await request.json();

    if (!fromTokenId || !toTokenId) {
      return NextResponse.json(
        { error: 'From token ID and to token ID are required' },
        { status: 400 },
      );
    }

    const data = encodeFunctionData({
      abi: VOTING_ESCROW_ABI,
      functionName: 'increase_amount',
      args: [BigInt(fromTokenId)],
    });

    return NextResponse.json({
      to: '0x...', // Replace with actual veAERO contract address
      data,
    });
  } catch (error) {
    console.error('Error generating merge locks transaction:', error);
    return NextResponse.json(
      { error: 'Failed to generate merge locks transaction' },
      { status: 500 },
    );
  }
}
