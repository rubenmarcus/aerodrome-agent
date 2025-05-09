import { AERODROME_ROUTER } from '@/app/config';
import { ROUTER_ABI } from '@/lib/contracts';
import { publicClient } from '@/lib/viem';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const token0 = searchParams.get('token0');
    const token1 = searchParams.get('token1');

    if (!token0 || !token1) {
      return NextResponse.json({ error: 'Both token0 and token1 are required' }, { status: 400 });
    }

    const poolAddress = await publicClient.readContract({
      address: AERODROME_ROUTER,
      abi: ROUTER_ABI,
      functionName: 'getPool',
      args: [token0 as `0x${string}`, token1 as `0x${string}`],
    });

    return NextResponse.json({ poolAddress });
  } catch (error) {
    console.error('Error getting pool address:', error);
    return NextResponse.json({ error: 'Failed to get pool address' }, { status: 500 });
  }
}
