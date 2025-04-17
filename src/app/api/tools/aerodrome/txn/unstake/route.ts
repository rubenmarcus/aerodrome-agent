import { NextResponse } from 'next/server';
import { parseEther, encodeFunctionData } from 'viem';
import { GAUGE_ABI } from '@/lib/contracts';

export async function POST(request: Request) {
  try {
    const { gaugeAddress, amount } = await request.json();

    if (!gaugeAddress || !amount) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    // Convert amount to wei
    const amountWei = parseEther(amount.toString());

    // Generate unstake transaction
    const data = encodeFunctionData({
      abi: GAUGE_ABI,
      functionName: 'withdraw',
      args: [amountWei]
    });

    return NextResponse.json({
      to: gaugeAddress,
      data
    });
  } catch (error) {
    console.error('Error generating unstake transaction:', error);
    return NextResponse.json(
      { error: 'Failed to generate unstake transaction' },
      { status: 500 }
    );
  }
}