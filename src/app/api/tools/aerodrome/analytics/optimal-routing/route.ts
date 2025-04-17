import { NextResponse } from 'next/server';
import { publicClient } from '@/lib/viem';
import { POOL_ABI, ERC20_ABI } from '@/lib/contracts';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const tokenIn = searchParams.get('tokenIn');
    const tokenOut = searchParams.get('tokenOut');
    const amount = searchParams.get('amount');

    if (!tokenIn || !tokenOut || !amount) {
      return NextResponse.json(
        { error: 'Token in, token out, and amount are required' },
        { status: 400 }
      );
    }

    // Get all pools (placeholder - would get from The Graph in real implementation)
    const pools = [
      {
        poolAddress: '0x...',
        token0: {
          address: '0x...',
          symbol: 'USDC',
        },
        token1: {
          address: '0x...',
          symbol: 'ETH',
        },
        reserves: {
          token0: '1000000',
          token1: '500',
        },
        fee: '0.003',
      },
      {
        poolAddress: '0x...',
        token0: {
          address: '0x...',
          symbol: 'USDC',
        },
        token1: {
          address: '0x...',
          symbol: 'AERO',
        },
        reserves: {
          token0: '500000',
          token1: '100000',
        },
        fee: '0.003',
      },
      {
        poolAddress: '0x...',
        token0: {
          address: '0x...',
          symbol: 'AERO',
        },
        token1: {
          address: '0x...',
          symbol: 'ETH',
        },
        reserves: {
          token0: '100000',
          token1: '200',
        },
        fee: '0.003',
      },
    ];

    // Find direct pool if exists
    const directPool = pools.find(pool =>
      (pool.token0.address === tokenIn && pool.token1.address === tokenOut) ||
      (pool.token0.address === tokenOut && pool.token1.address === tokenIn)
    );

    // Find possible routes through intermediate tokens
    const routes = [];
    if (!directPool) {
      // Find pools that contain input token
      const inputPools = pools.filter(pool =>
        pool.token0.address === tokenIn || pool.token1.address === tokenIn
      );

      // Find pools that contain output token
      const outputPools = pools.filter(pool =>
        pool.token0.address === tokenOut || pool.token1.address === tokenOut
      );

      // Find common intermediate tokens
      for (const inputPool of inputPools) {
        const intermediateToken = inputPool.token0.address === tokenIn
          ? inputPool.token1.address
          : inputPool.token0.address;

        const outputPool = outputPools.find(pool =>
          pool.token0.address === intermediateToken || pool.token1.address === intermediateToken
        );

        if (outputPool) {
          routes.push({
            path: [inputPool, outputPool],
            intermediateToken,
          });
        }
      }
    }

    // Calculate output amounts and slippage for each route
    const routeDetails = [];
    if (directPool) {
      const amountIn = Number(amount);
      const reserveIn = directPool.token0.address === tokenIn
        ? Number(directPool.reserves.token0)
        : Number(directPool.reserves.token1);
      const reserveOut = directPool.token0.address === tokenIn
        ? Number(directPool.reserves.token1)
        : Number(directPool.reserves.token0);

      const amountOut = (reserveOut * amountIn) / (reserveIn + amountIn);
      const slippage = (amountIn / reserveIn) * 100;

      routeDetails.push({
        path: [directPool],
        amountOut: amountOut.toString(),
        slippage: slippage.toString(),
        gasEstimate: '100000', // Placeholder
      });
    }

    for (const route of routes) {
      // Calculate first hop
      const firstPool = route.path[0];
      const amountIn = Number(amount);
      const reserveIn = firstPool.token0.address === tokenIn
        ? Number(firstPool.reserves.token0)
        : Number(firstPool.reserves.token1);
      const reserveOut = firstPool.token0.address === tokenIn
        ? Number(firstPool.reserves.token1)
        : Number(firstPool.reserves.token0);

      const intermediateAmount = (reserveOut * amountIn) / (reserveIn + amountIn);

      // Calculate second hop
      const secondPool = route.path[1];
      const reserveIn2 = secondPool.token0.address === route.intermediateToken
        ? Number(secondPool.reserves.token0)
        : Number(secondPool.reserves.token1);
      const reserveOut2 = secondPool.token0.address === route.intermediateToken
        ? Number(secondPool.reserves.token1)
        : Number(secondPool.reserves.token0);

      const amountOut = (reserveOut2 * intermediateAmount) / (reserveIn2 + intermediateAmount);
      const slippage = ((amountIn / reserveIn) + (intermediateAmount / reserveIn2)) * 100;

      routeDetails.push({
        path: route.path,
        amountOut: amountOut.toString(),
        slippage: slippage.toString(),
        gasEstimate: '200000', // Placeholder
      });
    }

    // Sort routes by output amount
    routeDetails.sort((a, b) => Number(b.amountOut) - Number(a.amountOut));

    return NextResponse.json({
      tokenIn,
      tokenOut,
      amount,
      routes: routeDetails,
      recommendations: [
        'Consider splitting large swaps into multiple smaller transactions',
        'Monitor pool health and liquidity before executing swap',
        'Set appropriate slippage tolerance based on market conditions',
      ],
    });
  } catch (error) {
    console.error('Error getting optimal routing:', error);
    return NextResponse.json(
      { error: 'Failed to get optimal routing' },
      { status: 500 }
    );
  }
}