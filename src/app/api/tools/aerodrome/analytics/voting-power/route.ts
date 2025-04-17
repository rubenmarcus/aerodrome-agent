import { NextResponse } from 'next/server';
import { publicClient } from '@/app/lib/viem';
import { VOTING_ESCROW_ABI, ERC20_ABI } from '@/app/lib/contracts';

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

    // Get veAERO balance and lock info
    const [balance, lockEnd, lockAmount] = await Promise.all([
      publicClient.readContract({
        address: '0x...' as `0x${string}`, // Replace with actual veAERO contract address
        abi: VOTING_ESCROW_ABI,
        functionName: 'balanceOf',
        args: [userAddress as `0x${string}`],
      }),
      publicClient.readContract({
        address: '0x...' as `0x${string}`, // Replace with actual veAERO contract address
        abi: VOTING_ESCROW_ABI,
        functionName: 'locked__end',
        args: [userAddress as `0x${string}`],
      }),
      publicClient.readContract({
        address: '0x...' as `0x${string}`, // Replace with actual veAERO contract address
        abi: VOTING_ESCROW_ABI,
        functionName: 'locked',
        args: [userAddress as `0x${string}`],
      }),
    ]);

    // Get AERO balance
    const aeroBalance = await publicClient.readContract({
      address: '0x...' as `0x${string}`, // Replace with actual AERO contract address
      abi: ERC20_ABI,
      functionName: 'balanceOf',
      args: [userAddress as `0x${string}`],
    });

    // Calculate boost multiplier (simplified)
    const currentTime = Math.floor(Date.now() / 1000);
    const timeRemaining = Number(lockEnd as bigint) - currentTime;
    const maxLockTime = 4 * 365 * 24 * 60 * 60; // 4 years in seconds
    const boostMultiplier = timeRemaining / maxLockTime;

    // Calculate voting power
    const votingPower = Number(balance as bigint) / 1e18;

    // Calculate optimal lock duration (simplified)
    const optimalLockDuration = Math.min(
      Math.max(timeRemaining, 30 * 24 * 60 * 60), // At least 30 days
      4 * 365 * 24 * 60 * 60 // Maximum 4 years
    );

    return NextResponse.json({
      userAddress,
      balances: {
        veAERO: (balance as bigint).toString(),
        AERO: aeroBalance.toString(),
      },
      lockInfo: {
        amount: (lockAmount as bigint).toString(),
        end: (lockEnd as bigint).toString(),
        timeRemaining: timeRemaining.toString(),
      },
      votingPower: {
        current: votingPower.toString(),
        boostMultiplier: boostMultiplier.toString(),
        optimalLockDuration: optimalLockDuration.toString(),
      },
      recommendations: [
        'Consider extending lock duration for higher boost multiplier',
        'Monitor voting power distribution across gauges',
        'Consider consolidating multiple locks for better efficiency',
      ],
    });
  } catch (error) {
    console.error('Error getting voting power:', error);
    return NextResponse.json(
      { error: 'Failed to get voting power' },
      { status: 500 }
    );
  }
}