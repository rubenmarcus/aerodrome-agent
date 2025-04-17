import { NextResponse } from 'next/server';
import { encodeFunctionData } from 'viem';
import { VOTING_ESCROW_ABI } from '@/lib/contracts';

export async function POST(request: Request) {
  try {
    const { tokenId, amount } = await request.json();

    if (!tokenId || !amount) {
      return NextResponse.json(
        { error: 'Token ID and amount are required' },
        { status: 400 }
      );
    }

    const data = encodeFunctionData({
      abi: VOTING_ESCROW_ABI,
      functionName: 'create_lock',
      args: [BigInt(amount), BigInt(Math.floor(Date.now() / 1000) + 365 * 24 * 60 * 60)], // 1 year from now
    });

    return NextResponse.json({
      to: '0x...', // Replace with actual veAERO contract address
      data,
    });
  } catch (error) {
    console.error('Error generating split lock transaction:', error);
    return NextResponse.json(
      { error: 'Failed to generate split lock transaction' },
      { status: 500 }
    );
  }
}