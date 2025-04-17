import { BRIBE_ABI, CONTRACTS } from '@/lib/contracts';
import { NextResponse } from 'next/server';
import { encodeFunctionData, parseEther } from 'viem';

export async function POST(request: Request) {
  try {
    const { gaugeAddress, tokenAddress, amount } = await request.json();

    if (!gaugeAddress || !tokenAddress || !amount) {
      return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
    }

    // Convert amount to wei
    const amountWei = parseEther(amount.toString());

    // Generate create bribe transaction
    const data = encodeFunctionData({
      abi: BRIBE_ABI,
      functionName: 'createBribe',
      args: [gaugeAddress, tokenAddress, amountWei],
    });

    return NextResponse.json({
      to: CONTRACTS.BRIBE_FACTORY,
      data,
    });
  } catch (error) {
    console.error('Error generating create bribe transaction:', error);
    return NextResponse.json(
      { error: 'Failed to generate create bribe transaction' },
      { status: 500 },
    );
  }
}
