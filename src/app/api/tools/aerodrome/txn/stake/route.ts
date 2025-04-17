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

    // Generate stake transaction
    const data = encodeFunctionData({
      abi: GAUGE_ABI,
      functionName: 'deposit',
      args: [amountWei]
    });

    return NextResponse.json({
      to: gaugeAddress,
      data
    });
  } catch (error) {
    console.error('Error generating stake transaction:', error);
    return NextResponse.json(
      { error: 'Failed to generate stake transaction' },
      { status: 500 }
    );
  }
}