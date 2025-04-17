import { getPool } from '@/utils/graph';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const poolAddress = searchParams.get('poolAddress');
    const amount = searchParams.get('amount');
    const lockDuration = searchParams.get('lockDuration');

    if (!poolAddress) {
      return NextResponse.json({ error: 'Pool address is required' }, { status: 400 });
    }

    // Get pool data from The Graph
    const pool = await getPool(poolAddress);
    if (!pool) {
      return NextResponse.json({ error: 'Pool not found' }, { status: 404 });
    }

    // Use pool's APR if available, otherwise default to 0
    const baseAPR = pool.apr ? Number(pool.apr) : 0;

    // Calculate boost multiplier if lock duration is provided
    let boostMultiplier = 1;
    if (lockDuration) {
      const maxLockDuration = 4 * 365 * 24 * 60 * 60; // 4 years
      boostMultiplier = Number(lockDuration) / maxLockDuration;
    }

    // Calculate total APR
    const totalAPR = baseAPR * boostMultiplier;

    return NextResponse.json({
      baseAPR,
      boostMultiplier,
      totalAPR,
      amount: amount || '0',
      lockDuration: lockDuration || '0',
    });
  } catch (error) {
    console.error('Error calculating APR:', error);
    return NextResponse.json({ error: 'Failed to calculate APR' }, { status: 500 });
  }
}
