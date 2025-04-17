import { NextResponse } from 'next/server';
import { publicClient } from '@/lib/viem';
import { GAUGE_ABI, ERC20_ABI } from '@/lib/contracts';

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

    const [totalVotes, rewardToken] = await Promise.all([
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
    ]);

    const rewardTokenSymbol = await publicClient.readContract({
      address: rewardToken as `0x${string}`,
      abi: ERC20_ABI,
      functionName: 'symbol',
    });

    return NextResponse.json({
      gaugeAddress,
      totalVotes: (totalVotes as bigint).toString(),
      rewardToken: {
        address: rewardToken,
        symbol: rewardTokenSymbol,
      },
    });
  } catch (error) {
    console.error('Error getting bribe market info:', error);
    return NextResponse.json(
      { error: 'Failed to get bribe market info' },
      { status: 500 }
    );
  }
}