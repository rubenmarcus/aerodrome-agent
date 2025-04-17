import { NextResponse } from 'next/server';
import { publicClient } from '@/lib/viem';
import { VOTING_ESCROW_ABI, ERC20_ABI } from '@/lib/contracts';

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

    const [lockedBalance, unlockTime] = await publicClient.readContract({
      address: '0xeBf418Fe2512e7E6bd9b87a8F0f294aCDC67e6B4' as `0x${string}`,
      abi: VOTING_ESCROW_ABI,
      functionName: 'locked',
      args: [userAddress as `0x${string}`],
    });

    const currentBalance = await publicClient.readContract({
      address: '0xeBf418Fe2512e7E6bd9b87a8F0f294aCDC67e6B4' as `0x${string}`,
      abi: VOTING_ESCROW_ABI,
      functionName: 'balanceOf',
      args: [userAddress as `0x${string}`],
    });

    return NextResponse.json({
      userAddress,
      lockedBalance: (lockedBalance as bigint).toString(),
      unlockTime: (unlockTime as bigint).toString(),
      currentBalance: (currentBalance as bigint).toString(),
    });
  } catch (error) {
    console.error('Error getting voting power:', error);
    return NextResponse.json(
      { error: 'Failed to get voting power' },
      { status: 500 }
    );
  }
}