import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const lockDuration = searchParams.get('lockDuration');

    if (!lockDuration) {
      return NextResponse.json({ error: 'Lock duration is required' }, { status: 400 });
    }

    // Calculate boost multiplier
    const maxLockDuration = 4 * 365 * 24 * 60 * 60; // 4 years
    const boostMultiplier = Number(lockDuration) / maxLockDuration;

    // Calculate voting power
    const votingPower = boostMultiplier * 100; // Assuming 100 AERO locked

    return NextResponse.json({
      lockDuration: Number(lockDuration),
      boostMultiplier,
      votingPower,
      maxLockDuration,
    });
  } catch (error) {
    console.error('Error calculating boost:', error);
    return NextResponse.json({ error: 'Failed to calculate boost' }, { status: 500 });
  }
}
