import { NextResponse } from 'next/server';
import { publicClient } from '@/lib/viem';
import { VOTING_ESCROW_ABI } from '@/lib/contracts';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userAddress = searchParams.get('userAddress');
    const lockDuration = searchParams.get('lockDuration'); // in seconds
    const lockAmount = searchParams.get('lockAmount');

    if (!userAddress || !lockDuration || !lockAmount) {
      return NextResponse.json(
        { error: 'User address, lock duration, and lock amount are required' },
        { status: 400 }
      );
    }

    // Get current lock info if exists
    const [currentLocked, currentUnlockTime] = await publicClient.readContract({
      address: '0xeBf418Fe2512e7E6bd9b87a8F0f294aCDC67e6B4' as `0x${string}`,
      abi: VOTING_ESCROW_ABI,
      functionName: 'locked',
      args: [userAddress as `0x${string}`],
    });

    const currentTime = Math.floor(Date.now() / 1000);
    const maxLockTime = 4 * 365 * 24 * 60 * 60; // 4 years in seconds

    // Calculate boost multiplier
    const timeRemaining = Number(lockDuration);
    const boostMultiplier = timeRemaining / maxLockTime;

    // Calculate voting power
    const votingPower = (BigInt(lockAmount) * BigInt(timeRemaining)) / BigInt(maxLockTime);

    return NextResponse.json({
      userAddress,
      currentLock: {
        amount: (currentLocked as bigint).toString(),
        unlockTime: (currentUnlockTime as bigint).toString(),
      },
      proposedLock: {
        amount: lockAmount,
        duration: lockDuration,
        unlockTime: (currentTime + Number(lockDuration)).toString(),
      },
      boost: {
        multiplier: boostMultiplier.toString(),
        votingPower: votingPower.toString(),
        maxPossible: (BigInt(lockAmount) * 10000n) / 10000n, // 1.0 multiplier
      },
      recommendations: [
        'Longer lock durations provide higher boost multipliers',
        'Maximum boost is achieved at 4 years',
        'You can increase your lock amount at any time',
      ],
    });
  } catch (error) {
    console.error('Error calculating boost:', error);
    return NextResponse.json(
      { error: 'Failed to calculate boost' },
      { status: 500 }
    );
  }
}