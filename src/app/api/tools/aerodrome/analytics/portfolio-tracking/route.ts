import { NextResponse } from 'next/server';
import { publicClient } from '@/lib/viem';
import { GAUGE_ABI, ERC20_ABI } from '@/lib/contracts';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userAddress = searchParams.get('userAddress');

    if (!userAddress) {
      return NextResponse.json(
        { error: 'User address is required' },
        { status: 400 }
      );
    }

    // Get user's veAERO balance
    const veAeroBalance = await publicClient.readContract({
      address: '0x...' as `0x${string}`, // Replace with actual veAERO contract address
      abi: ERC20_ABI,
      functionName: 'balanceOf',
      args: [userAddress as `0x${string}`],
    });

    // Get user's AERO balance
    const aeroBalance = await publicClient.readContract({
      address: '0x...' as `0x${string}`, // Replace with actual AERO contract address
      abi: ERC20_ABI,
      functionName: 'balanceOf',
      args: [userAddress as `0x${string}`],
    });

    // Get user's LP positions (placeholder - would get from The Graph in real implementation)
    const lpPositions = [
      {
        poolAddress: '0x...',
        token0: {
          address: '0x...',
          symbol: 'USDC',
          amount: '1000',
        },
        token1: {
          address: '0x...',
          symbol: 'ETH',
          amount: '1',
        },
        lpBalance: '1000',
        value: '2000',
      },
    ];

    // Get user's staked positions (placeholder - would get from The Graph in real implementation)
    const stakedPositions = [
      {
        gaugeAddress: '0x...',
        poolAddress: '0x...',
        lpBalance: '1000',
        value: '2000',
        pendingRewards: '100',
      },
    ];

    // Calculate total portfolio value (simplified)
    const totalValue = lpPositions.reduce((sum, pos) => sum + Number(pos.value), 0) +
      stakedPositions.reduce((sum, pos) => sum + Number(pos.value), 0) +
      Number(veAeroBalance) / 1e18 +
      Number(aeroBalance) / 1e18;

    return NextResponse.json({
      userAddress,
      balances: {
        veAERO: veAeroBalance.toString(),
        AERO: aeroBalance.toString(),
      },
      lpPositions,
      stakedPositions,
      totalValue: totalValue.toString(),
    });
  } catch (error) {
    console.error('Error getting portfolio tracking:', error);
    return NextResponse.json(
      { error: 'Failed to get portfolio tracking' },
      { status: 500 }
    );
  }
}