import { NextResponse } from 'next/server';
import { parseEther, encodeFunctionData } from 'viem';
import { AERODROME_ROUTER } from '@/app/config';
import { ROUTER_ABI } from '@/app/lib/contracts';

export async function POST(request: Request) {
  try {
    const { tokenA, tokenB, amountADesired, amountBDesired, amountAMin, amountBMin, to, deadline } = await request.json();

    if (!tokenA || !tokenB || !amountADesired || !amountBDesired || !amountAMin || !amountBMin || !to || !deadline) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    // Convert amounts to wei
    const amountADesiredWei = parseEther(amountADesired.toString());
    const amountBDesiredWei = parseEther(amountBDesired.toString());
    const amountAMinWei = parseEther(amountAMin.toString());
    const amountBMinWei = parseEther(amountBMin.toString());

    // Generate add liquidity transaction
    const data = encodeFunctionData({
      abi: ROUTER_ABI,
      functionName: 'addLiquidity',
      args: [
        tokenA,
        tokenB,
        amountADesiredWei,
        amountBDesiredWei,
        amountAMinWei,
        amountBMinWei,
        to,
        deadline
      ]
    });

    return NextResponse.json({
      to: AERODROME_ROUTER,
      data
    });
  } catch (error) {
    console.error('Error generating add liquidity transaction:', error);
    return NextResponse.json(
      { error: 'Failed to generate add liquidity transaction' },
      { status: 500 }
    );
  }
}