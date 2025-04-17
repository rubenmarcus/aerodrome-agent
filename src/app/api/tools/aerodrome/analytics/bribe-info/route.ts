import { BRIBE_ABI, CONTRACTS, ERC20_ABI } from '@/lib/contracts';
import { publicClient } from '@/lib/viem';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const gaugeAddress = searchParams.get('gaugeAddress');

    if (!gaugeAddress) {
      return NextResponse.json({ error: 'Gauge address is required' }, { status: 400 });
    }

    // Get active bribes for the gauge
    const activeBribes = await publicClient.readContract({
      address: CONTRACTS.BRIBE_FACTORY,
      abi: BRIBE_ABI,
      functionName: 'getActiveBribes',
      args: [gaugeAddress as `0x${string}`],
    });

    // Get token info for each bribe
    const bribesWithTokenInfo = await Promise.all(
      activeBribes.map(async (bribe: any) => {
        const [symbol, decimals] = await Promise.all([
          publicClient.readContract({
            address: bribe.token as `0x${string}`,
            abi: ERC20_ABI,
            functionName: 'symbol',
          }),
          publicClient.readContract({
            address: bribe.token as `0x${string}`,
            abi: ERC20_ABI,
            functionName: 'decimals',
          }),
        ]);

        return {
          token: {
            address: bribe.token,
            symbol,
            decimals: Number(decimals),
          },
          amount: bribe.amount.toString(),
          apr: bribe.apr.toString(),
          duration: bribe.duration.toString(),
        };
      }),
    );

    return NextResponse.json({
      gaugeAddress,
      activeBribes: bribesWithTokenInfo,
    });
  } catch (error) {
    console.error('Error getting bribe info:', error);
    return NextResponse.json({ error: 'Failed to get bribe info' }, { status: 500 });
  }
}
