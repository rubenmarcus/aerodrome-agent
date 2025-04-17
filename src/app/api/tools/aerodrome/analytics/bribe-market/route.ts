import { NextResponse } from 'next/server';
import { publicClient } from '@/lib/viem';
import { GAUGE_ABI, ERC20_ABI, BRIBE_ABI, CONTRACTS } from '@/lib/contracts';
import { getBribeStrategy } from '@/utils/graph';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const gaugeAddress = searchParams.get('gaugeAddress');

    if (!gaugeAddress) {
      return NextResponse.json(
        { error: 'Gauge address is required' },
        { status: 400 }
      );
    }

    // Get basic gauge info
    const [totalVotes, rewardToken, currentApr] = await Promise.all([
      publicClient.readContract({
        address: gaugeAddress as `0x${string}`,
        abi: GAUGE_ABI,
        functionName: 'totalVotes',
      }),
      publicClient.readContract({
        address: gaugeAddress as `0x${string}`,
        abi: GAUGE_ABI,
        functionName: 'rewardToken',
      }),
      publicClient.readContract({
        address: gaugeAddress as `0x${string}`,
        abi: GAUGE_ABI,
        functionName: 'currentApr',
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

    // Get active bribes
    const activeBribes = await publicClient.readContract({
      address: CONTRACTS.BRIBE_FACTORY,
      abi: BRIBE_ABI,
      functionName: 'getActiveBribes',
      args: [gaugeAddress as `0x${string}`],
    });

    // Get bribe strategy
    const bribeStrategy = await getBribeStrategy(gaugeAddress);

    // Calculate market metrics
    const totalBribeValue = activeBribes.reduce((sum: bigint, bribe: any) => sum + BigInt(bribe.amount), 0n);
    const averageBribeApr = activeBribes.reduce((sum: bigint, bribe: any) => sum + BigInt(bribe.apr), 0n) /
      (activeBribes.length > 0 ? BigInt(activeBribes.length) : 1n);

    return NextResponse.json({
      gaugeAddress,
      metrics: {
        totalVotes: (totalVotes as bigint).toString(),
        currentApr: (currentApr as bigint).toString(),
        totalBribeValue: totalBribeValue.toString(),
        averageBribeApr: averageBribeApr.toString(),
      },
      rewardToken: {
        address: rewardToken,
        symbol: rewardTokenSymbol,
        decimals: Number(rewardTokenDecimals),
      },
      activeBribes: activeBribes.map((bribe: any) => ({
        token: bribe.token,
        amount: bribe.amount.toString(),
        apr: bribe.apr.toString(),
        duration: bribe.duration.toString(),
      })),
      strategy: bribeStrategy,
      recommendations: [
        'Monitor voting power distribution for optimal bribe timing',
        'Consider splitting bribes across multiple epochs',
        'Compare bribe APR with gauge APR for better returns',
        'Coordinate with other bribe participants for efficiency',
      ],
    });
  } catch (error) {
    console.error('Error getting bribe market info:', error);
    return NextResponse.json(
      { error: 'Failed to get bribe market info' },
      { status: 500 }
    );
  }
}