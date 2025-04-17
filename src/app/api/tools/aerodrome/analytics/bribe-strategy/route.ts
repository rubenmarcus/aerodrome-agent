import { NextResponse } from 'next/server';
import { publicClient } from '@/app/lib/viem';
import { GAUGE_ABI, ERC20_ABI } from '@/app/lib/contracts';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const gaugeAddress = searchParams.get('gaugeAddress');
    const amount = searchParams.get('amount');

    if (!gaugeAddress || !amount) {
      return NextResponse.json(
        { error: 'Gauge address and amount are required' },
        { status: 400 }
      );
    }

    // Get gauge info
    const [totalSupply, rewardRate, periodFinish, rewardToken] = await Promise.all([
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
      publicClient.readContract({
        address: gaugeAddress as `0x${string}`,
        abi: GAUGE_ABI,
        functionName: 'periodFinish',
      }),
      publicClient.readContract({
        address: gaugeAddress as `0x${string}`,
        abi: GAUGE_ABI,
        functionName: 'rewardToken',
      }),
    ]);

    // Get reward token info
    const [rewardTokenSymbol, rewardTokenDecimals] = await Promise.all([
      publicClient.readContract({
        address: rewardToken as `0x${string}`,
        abi: ERC20_ABI,
        functionName: 'symbol',
      }),
      publicClient.readContract({
        address: rewardToken as `0x${string}`,
        abi: ERC20_ABI,
        functionName: 'decimals',
      }),
    ]);

    // Calculate emissions rate
    const emissionsRate = (BigInt(rewardRate as bigint) * 86400n * 365n) / (10n ** BigInt(rewardTokenDecimals));

    // Calculate bribe ROI (simplified)
    const amountNum = Number(amount);
    const dailyEmissions = Number(emissionsRate) / 365;
    const bribeShare = amountNum / (Number(totalSupply) + amountNum);
    const dailyRewards = dailyEmissions * bribeShare;
    const roiDays = amountNum / dailyRewards;

    // Calculate optimal timing (simplified)
    const currentTime = Math.floor(Date.now() / 1000);
    const timeToNextEpoch = Number(periodFinish) - currentTime;
    const optimalTiming = timeToNextEpoch < 86400 ? 'Now' : 'Next epoch';

    return NextResponse.json({
      gaugeAddress,
      bribeAmount: amount,
      rewardToken: {
        address: rewardToken,
        symbol: rewardTokenSymbol,
        decimals: Number(rewardTokenDecimals),
      },
      metrics: {
        totalSupply: (totalSupply as bigint).toString(),
        emissionsRate: emissionsRate.toString(),
        dailyRewards: dailyRewards.toString(),
        roiDays: roiDays.toString(),
        timeToNextEpoch: timeToNextEpoch.toString(),
      },
      strategy: {
        optimalTiming,
        recommendedAmount: (amountNum * 1.1).toString(), // 10% buffer
        minDuration: '7 days', // Minimum recommended bribe duration
      },
      recommendations: [
        'Consider splitting bribe across multiple epochs for better price discovery',
        'Monitor gauge health and voting power distribution',
        'Consider coordinating with other bribe participants for better efficiency',
      ],
    });
  } catch (error) {
    console.error('Error getting bribe strategy:', error);
    return NextResponse.json(
      { error: 'Failed to get bribe strategy' },
      { status: 500 }
    );
  }
}