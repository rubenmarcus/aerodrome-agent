import { NextResponse } from 'next/server';
import { publicClient } from '@/lib/viem';
import { VOTING_ESCROW_ABI, GAUGE_ABI } from '@/lib/contracts';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userAddress = searchParams.get('userAddress');
    const gaugeAddress = searchParams.get('gaugeAddress');

    if (!userAddress || !gaugeAddress) {
      return NextResponse.json(
        { error: 'User address and gauge address are required' },
        { status: 400 }
      );
    }

    // Get user's veAERO balance and lock info
    const [lockedBalance, unlockTime] = await publicClient.readContract({
      address: '0xeBf418Fe2512e7E6bd9b87a8F0f294aCDC67e6B4' as `0x${string}`,
      abi: VOTING_ESCROW_ABI,
      functionName: 'locked',
      args: [userAddress as `0x${string}`],
    });

    const veBalance = await publicClient.readContract({
      address: '0xeBf418Fe2512e7E6bd9b87a8F0f294aCDC67e6B4' as `0x${string}`,
      abi: VOTING_ESCROW_ABI,
      functionName: 'balanceOf',
      args: [userAddress as `0x${string}`],
    });

    // Get gauge info
    const [totalSupply, rewardRate] = await Promise.all([
      publicClient.readContract({
        address: gaugeAddress as `0x${string}`,
        abi: GAUGE_ABI,
        functionName: 'totalSupply',
      }),
      publicClient.readContract({
        address: gaugeAddress as `0x${string}`,
        abi: GAUGE_ABI,
        functionName: 'rewardRate',
      }),
    ]);

    // Calculate boost multiplier
    const currentTime = Math.floor(Date.now() / 1000);
    const timeRemaining = Number(unlockTime as bigint) - currentTime;
    const maxLockTime = 4 * 365 * 24 * 60 * 60; // 4 years in seconds
    const boostMultiplier = timeRemaining / maxLockTime;

    // Calculate rewards
    const dailyRewards = (BigInt(rewardRate as bigint) * 86400n * BigInt(boostMultiplier)) / BigInt(totalSupply);

    return NextResponse.json({
      userAddress,
      veToken: {
        balance: (veBalance as bigint).toString(),
        lockedAmount: (lockedBalance as bigint).toString(),
        unlockTime: (unlockTime as bigint).toString(),
        boostMultiplier: boostMultiplier.toString(),
      },
      rewards: {
        daily: dailyRewards.toString(),
        weekly: (dailyRewards * 7n).toString(),
        monthly: (dailyRewards * 30n).toString(),
        yearly: (dailyRewards * 365n).toString(),
      },
      recommendations: [
        'Consider extending lock duration for higher boost',
        'Monitor gauge weights for optimal rewards',
        'Regularly claim rewards to compound earnings',
      ],
    });
  } catch (error) {
    console.error('Error calculating rewards:', error);
    return NextResponse.json(
      { error: 'Failed to calculate rewards' },
      { status: 500 }
    );
  }
}