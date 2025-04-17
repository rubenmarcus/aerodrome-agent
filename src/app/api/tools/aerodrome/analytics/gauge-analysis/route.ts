import { ERC20_ABI, GAUGE_ABI } from '@/lib/contracts';
import { publicClient } from '@/lib/viem';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const gaugeAddress = searchParams.get('gaugeAddress');
    const userAddress = searchParams.get('userAddress');

    if (!gaugeAddress) {
      return NextResponse.json({ error: 'Gauge address is required' }, { status: 400 });
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
    const emissionsRate =
      (BigInt(rewardRate as bigint) * 86400n * 365n) / 10n ** BigInt(rewardTokenDecimals);

    // Get user info if address provided
    let userInfo = null;
    if (userAddress) {
      const [balance, rewardDebt] = await Promise.all([
        publicClient.readContract({
          address: gaugeAddress as `0x${string}`,
          abi: GAUGE_ABI,
          functionName: 'balanceOf',
          args: [userAddress as `0x${string}`],
        }),
        publicClient.readContract({
          address: gaugeAddress as `0x${string}`,
          abi: GAUGE_ABI,
          functionName: 'earned',
          args: [userAddress as `0x${string}`],
        }),
      ]);

      // Calculate user share
      const userShare =
        BigInt(totalSupply as bigint) > 0n
          ? (BigInt(balance as bigint) * 10000n) / BigInt(totalSupply as bigint)
          : 0n;

      // Calculate boost multiplier (simplified - would use veAERO balance in real implementation)
      const boostMultiplier = 1;

      userInfo = {
        balance: (balance as bigint).toString(),
        rewardDebt: (rewardDebt as bigint).toString(),
        share: Number(userShare) / 100,
        boostMultiplier,
      };
    }

    // Calculate required voting power for max boost (placeholder)
    const requiredVotingPower = '1000'; // Would calculate based on pool size and veAERO distribution

    return NextResponse.json({
      gaugeAddress,
      rewardToken: {
        address: rewardToken,
        symbol: rewardTokenSymbol,
        decimals: Number(rewardTokenDecimals),
      },
      metrics: {
        totalSupply: (totalSupply as bigint).toString(),
        emissionsRate: emissionsRate.toString(),
        periodFinish: (periodFinish as bigint).toString(),
        requiredVotingPower,
      },
      userInfo,
    });
  } catch (error) {
    console.error('Error getting gauge analysis:', error);
    return NextResponse.json({ error: 'Failed to get gauge analysis' }, { status: 500 });
  }
}
