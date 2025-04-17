import { NextResponse } from 'next/server';
import { publicClient } from '@/lib/viem';
import { GAUGE_ABI } from '@/lib/contracts';

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

    const [poolAddress, totalVotes, currentApr] = await Promise.all([
      publicClient.readContract({
        address: gaugeAddress as `0x${string}`,
        abi: GAUGE_ABI,
        functionName: 'pool',
      }),
      publicClient.readContract({
        address: gaugeAddress as `0x${string}`,
        abi: GAUGE_ABI,
        functionName: 'totalVotes',
      }),
      publicClient.readContract({
        address: gaugeAddress as `0x${string}`,
        abi: GAUGE_ABI,
        functionName: 'currentApr',
      }),
    ]);

    return NextResponse.json({
      poolAddress,
      totalVotes: (totalVotes as bigint).toString(),
      currentApr: (currentApr as bigint).toString(),
    });
  } catch (error) {
    console.error('Error getting gauge info:', error);
    return NextResponse.json(
      { error: 'Failed to get gauge info' },
      { status: 500 }
    );
  }
}