import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const amount = searchParams.get('amount');
    const targetVotingPower = searchParams.get('targetVotingPower');

    if (!amount) {
      return NextResponse.json({ error: 'Amount is required' }, { status: 400 });
    }

    // Calculate optimal lock duration based on target voting power
    const amountWei = BigInt(amount);
    const maxLockDuration = 4 * 365 * 24 * 60 * 60; // 4 years

    let optimalDuration = maxLockDuration;
    if (targetVotingPower) {
      // Calculate duration needed to achieve target voting power
      const targetVP = BigInt(targetVotingPower);
      optimalDuration = Number((targetVP * BigInt(maxLockDuration)) / amountWei);
    }

    // Calculate voting power for different durations
    const durations = [7, 30, 90, 180, 365, 730, 1095, 1460].map((days) => days * 24 * 60 * 60);
    const votingPowers = durations.map((duration) => {
      const boost = Number(duration) / maxLockDuration;
      return (amountWei * BigInt(Math.floor(boost * 10000))) / 10000n;
    });

    return NextResponse.json({
      amount: amountWei.toString(),
      optimalDuration: optimalDuration.toString(),
      maxLockDuration: maxLockDuration.toString(),
      votingPowers: durations.map((duration, i) => ({
        duration: duration.toString(),
        votingPower: votingPowers[i].toString(),
        boost: Number(duration) / maxLockDuration,
      })),
    });
  } catch (error) {
    console.error('Error calculating optimal lock duration:', error);
    return NextResponse.json(
      { error: 'Failed to calculate optimal lock duration' },
      { status: 500 },
    );
  }
}
