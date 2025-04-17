import { NextResponse } from 'next/server';
import { parseEther, encodeFunctionData } from 'viem';
import { AERODROME_ROUTER } from '@/app/config';
import { ROUTER_ABI } from '@/lib/contracts';

export async function POST(request: Request) {
  try {
    const { tokenIn, tokenOut, amountIn, amountOutMin, to, deadline } = await request.json();

    if (!tokenIn || !tokenOut || !amountIn || !amountOutMin || !to || !deadline) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    // Prepare swap parameters
    const path = [tokenIn, tokenOut];
    const amountInWei = parseEther(amountIn.toString());
    const amountOutMinWei = parseEther(amountOutMin.toString());

    // Generate swap transaction
    const data = encodeFunctionData({
      abi: ROUTER_ABI,
      functionName: 'swapExactTokensForTokens',
      args: [
        amountInWei,
        amountOutMinWei,
        path,
        to,
        deadline
      ]
    });

    return NextResponse.json({
      to: AERODROME_ROUTER,
      data
    });
  } catch (error) {
    console.error('Error generating swap transaction:', error);
    return NextResponse.json(
      { error: 'Failed to generate swap transaction' },
      { status: 500 }
    );
  }
}