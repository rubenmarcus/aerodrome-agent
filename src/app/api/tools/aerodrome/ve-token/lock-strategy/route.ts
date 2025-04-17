import { NextResponse } from 'next/server';
import { publicClient } from '@/lib/viem';
import { VOTING_ESCROW_ABI } from '@/lib/contracts';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userAddress = searchParams.get('userAddress');
    const investmentHorizon = searchParams.get('horizon'); // in years

    if (!userAddress || !investmentHorizon) {
      return NextResponse.json(
        { error: 'User address and investment horizon are required' },
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
    const horizonSeconds = Number(investmentHorizon) * 365 * 24 * 60 * 60;
    const maxLockTime = 4 * 365 * 24 * 60 * 60; // 4 years in seconds

    // Calculate optimal lock duration
    const optimalLockDuration = Math.min(horizonSeconds, maxLockTime);
    const optimalUnlockTime = currentTime + optimalLockDuration;

    // Calculate boost multipliers
    const currentBoost = currentUnlockTime ?
      (Number(currentUnlockTime as bigint) - currentTime) / maxLockTime : 0;
    const proposedBoost = optimalLockDuration / maxLockTime;

    return NextResponse.json({
      userAddress,
      currentLock: {
        amount: (currentLocked as bigint).toString(),
        unlockTime: (currentUnlockTime as bigint).toString(),
        boostMultiplier: currentBoost.toString(),
      },
      recommendedStrategy: {
        lockDuration: optimalLockDuration.toString(),
        unlockTime: optimalUnlockTime.toString(),
        boostMultiplier: proposedBoost.toString(),
        votingPower: ((currentLocked as bigint) * BigInt(proposedBoost * 10000)) / 10000n,
      },
      scenarios: [
        {
          duration: '1 year',
          boost: (1 / 4).toString(),
          votingPower: ((currentLocked as bigint) * 2500n) / 10000n,
        },
        {
          duration: '2 years',
          boost: (2 / 4).toString(),
          votingPower: ((currentLocked as bigint) * 5000n) / 10000n,
        },
        {
          duration: '3 years',
          boost: (3 / 4).toString(),
          votingPower: ((currentLocked as bigint) * 7500n) / 10000n,
        },
        {
          duration: '4 years',
          boost: '1.0',
          votingPower: currentLocked as bigint,
        },
      ],
      recommendations: [
        'Longer locks provide higher boost multipliers',
        'Consider your investment horizon when choosing lock duration',
        'You can increase your lock amount at any time',
        'Monitor gauge weights for optimal voting strategy',
      ],
    });
  } catch (error) {
    console.error('Error getting lock strategy:', error);
    return NextResponse.json(
      { error: 'Failed to get lock strategy' },
      { status: 500 }
    );
  }
}