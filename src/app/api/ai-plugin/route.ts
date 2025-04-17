import { ACCOUNT_ID } from '@/app/config';
import { NextResponse } from 'next/server';

const BASE_URL = 'https://aerodrome-agent.vercel.app';

export async function GET() {
  const pluginData = {
    openapi: '3.0.0',
    info: {
      title: 'Aerodrome Finance',
      description: 'Your comprehensive DeFi assistant for Aerodrome Protocol on Base network. Generate transactions, analyze pools, optimize yields, and manage your DeFi portfolio with confidence.',
      version: '1.0.0',
    },
    servers: [
      {
        url: BASE_URL,
      },
    ],
    'x-mb': {
      'account-id': '0x58754047b0D25ffB23F05D5fc6dD9ccE1d5ACC58',
      assistant: {
        name: 'Aerodrome Finance',
        description: 'Your expert guide for Aerodrome Protocol on Base network. I help you navigate DeFi operations, optimize yields, and make informed decisions with real-time analytics and transaction support.',
        instructions: `
        I am your dedicated Aerodrome Protocol assistant, specialized in Base network operations. I provide comprehensive support for all your DeFi needs while maintaining strict security and accuracy standards.

NETWORK SUPPORT:
- Exclusively supports Base network (chainId: 8453)
- Requires explicit chainId specification for all operations
- Never supports or suggests operations on other networks

TOKEN MANAGEMENT:
- Native ETH: Uses 0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE as the token address
- Accepts token symbols for user convenience
- Requires explicit token addresses when provided
- Always uses Token Units for amount specifications

TRANSACTION SECURITY:
- Validates all transaction parameters before generation
- Ensures pool and gauge addresses are verified
- Checks voting power and boost multipliers
- Provides complete transaction meta information
- Requires explicit confirmation before execution

POOL OPERATIONS:
- Maintains up-to-date pool information through pools-list endpoint
- Verifies pool existence and validity
- Provides comprehensive pool metrics including:
  * Token pairs and their details
  * Fee structures
  * Liquidity metrics
  * Trading volumes
  * Historical performance

ANALYTICS & OPTIMIZATION:
1. Pool Analytics:
   - Real-time APR/APY calculations
   - Volume and liquidity tracking
   - Impermanent loss analysis
   - Historical performance metrics

2. Gauge Management:
   - veAERO emissions tracking
   - Voting power optimization
   - Boost multiplier calculations
   - Strategic voting recommendations

3. Yield Optimization:
   - Risk-adjusted strategy recommendations
   - Multi-pool yield comparisons
   - Fee optimization
   - Capital efficiency analysis

4. Position Management:
   - Optimal entry/exit strategies
   - Slippage minimization
   - Portfolio rebalancing
   - Risk management

5. Bribe Strategy:
   - ROI analysis
   - Timing optimization
   - Amount recommendations
   - Historical performance tracking

6. Trading Optimization:
   - Multi-pool routing
   - Gas cost optimization
   - Slippage protection
   - Best execution strategies

7. Portfolio Tracking:
   - Real-time position monitoring
   - Reward tracking
   - Performance analytics
   - Risk exposure analysis

SECURITY PROTOCOLS:
- Mandatory chainId validation
- Network compatibility checks
- Token and pool verification
- Transaction parameter validation
- Explicit confirmation requirements

I maintain these standards to ensure secure, efficient, and profitable DeFi operations while providing you with the most accurate and up-to-date information for your Aerodrome Protocol interactions.`,
        tools: [
          { type: 'generate-tx' },
          { type: 'get-pool-analytics' },
          { type: 'get-gauge-analysis' },
          { type: 'get-yield-optimization' },
          { type: 'get-position-management' },
          { type: 'get-bribe-strategy' },
          { type: 'get-optimal-routing' },
          { type: 'get-portfolio-tracking' },
          { type: 'get-pools-list' }
        ],
        image: `${BASE_URL}/aerodrome.svg`,
        categories: ['defi', 'analytics', 'portfolio'],
        chainIds: [8453],
      },
      image: `${BASE_URL}/aerodrome.svg`,
    },
    paths: {
      '/api/tools/aerodrome/generate-tx': {
        post: {
          summary: 'Generate Aerodrome transaction',
          description: 'Generates transaction data for Aerodrome Protocol interactions',
          operationId: 'generate-tx',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['operation'],
                  properties: {
                    operation: {
                      type: 'string',
                      enum: ['swap', 'addLiquidity', 'removeLiquidity', 'stake', 'unstake', 'claimRewards', 'vote', 'createGauge', 'depositBribe', 'withdrawBribe', 'boostGauge', 'lockVeAERO', 'extendLock', 'increaseAmount', 'mergeLocks', 'splitLock', 'withdrawExpired', 'claimFees', 'claimBribes', 'createPool', 'setPoolFee', 'setPoolGauge', 'setPoolKillSwitch', 'setPoolWhitelist'],
                      description: 'The operation to perform',
                    },
                    chainId: {
                      type: 'integer',
                      enum: [8453],
                      description: 'The chain ID (only Base supported)',
                    },
                  },
                },
              },
            },
          },
          responses: {
            '200': {
              description: 'Transaction data generated successfully',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      to: {
                        type: 'string',
                        description: 'Contract address',
                      },
                      data: {
                        type: 'string',
                        description: 'Encoded transaction data',
                      },
                      value: {
                        type: 'string',
                        description: 'Transaction value in wei',
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      '/api/tools/aerodrome/pool-analytics': {
        get: {
          summary: 'Get pool analytics',
          description: 'Retrieves analytics data for a specific liquidity pool',
          operationId: 'get-pool-analytics',
          parameters: [
            {
              name: 'poolAddress',
              in: 'query',
              required: true,
              schema: {
                type: 'string',
              },
              description: 'The pool address to analyze',
            },
          ],
          responses: {
            '200': {
              description: 'Pool analytics retrieved successfully',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      apr: {
                        type: 'string',
                        description: 'Annual Percentage Rate',
                      },
                      apy: {
                        type: 'string',
                        description: 'Annual Percentage Yield',
                      },
                      volume24h: {
                        type: 'string',
                        description: '24-hour trading volume',
                      },
                      tvl: {
                        type: 'string',
                        description: 'Total Value Locked',
                      },
                      impermanentLoss: {
                        type: 'string',
                        description: 'Estimated impermanent loss',
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      '/api/tools/aerodrome/gauge-analysis': {
        get: {
          summary: 'Get gauge analysis',
          description: 'Retrieves analysis data for a specific gauge',
          operationId: 'get-gauge-analysis',
          parameters: [
            {
              name: 'gaugeAddress',
              in: 'query',
              required: true,
              schema: {
                type: 'string',
              },
              description: 'The gauge address to analyze',
            },
          ],
          responses: {
            '200': {
              description: 'Gauge analysis retrieved successfully',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      emissions: {
                        type: 'string',
                        description: 'Current emissions rate',
                      },
                      votingPower: {
                        type: 'string',
                        description: 'Required voting power',
                      },
                      boostMultiplier: {
                        type: 'string',
                        description: 'Current boost multiplier',
                      },
                      optimalStrategy: {
                        type: 'string',
                        description: 'Recommended voting strategy',
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      '/api/tools/aerodrome/yield-optimization': {
        get: {
          summary: 'Get yield optimization',
          description: 'Retrieves optimal yield farming strategies',
          operationId: 'get-yield-optimization',
          parameters: [
            {
              name: 'riskTolerance',
              in: 'query',
              required: true,
              schema: {
                type: 'string',
                enum: ['low', 'medium', 'high'],
              },
              description: 'User risk tolerance level',
            },
          ],
          responses: {
            '200': {
              description: 'Yield optimization strategies retrieved successfully',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      strategies: {
                        type: 'array',
                        items: {
                          type: 'object',
                          properties: {
                            pool: {
                              type: 'string',
                              description: 'Pool address',
                            },
                            expectedYield: {
                              type: 'string',
                              description: 'Expected annual yield',
                            },
                            riskLevel: {
                              type: 'string',
                              description: 'Risk level',
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      '/api/tools/aerodrome/position-management': {
        get: {
          summary: 'Get position management',
          description: 'Retrieves optimal entry/exit strategies for a position',
          operationId: 'get-position-management',
          parameters: [
            {
              name: 'poolAddress',
              in: 'query',
              required: true,
              schema: {
                type: 'string',
              },
              description: 'The pool address to manage position in',
            },
            {
              name: 'amount',
              in: 'query',
              required: true,
              schema: {
                type: 'string',
              },
              description: 'The amount to enter/exit with',
            },
          ],
          responses: {
            '200': {
              description: 'Position management data retrieved successfully',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      optimalEntry: {
                        type: 'object',
                        properties: {
                          token0Amount: {
                            type: 'string',
                            description: 'Optimal token0 amount for entry',
                          },
                          token1Amount: {
                            type: 'string',
                            description: 'Optimal token1 amount for entry',
                          },
                          slippage: {
                            type: 'string',
                            description: 'Expected slippage in basis points',
                          },
                        },
                      },
                      optimalExit: {
                        type: 'object',
                        properties: {
                          token0Amount: {
                            type: 'string',
                            description: 'Optimal token0 amount for exit',
                          },
                          token1Amount: {
                            type: 'string',
                            description: 'Optimal token1 amount for exit',
                          },
                          slippage: {
                            type: 'string',
                            description: 'Expected slippage in basis points',
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      '/api/tools/aerodrome/bribe-strategy': {
        get: {
          summary: 'Get bribe strategy',
          description: 'Retrieves optimal bribe strategy for a gauge',
          operationId: 'get-bribe-strategy',
          parameters: [
            {
              name: 'gaugeAddress',
              in: 'query',
              required: true,
              schema: {
                type: 'string',
              },
              description: 'The gauge address to analyze for bribing',
            },
          ],
          responses: {
            '200': {
              description: 'Bribe strategy retrieved successfully',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      roi: {
                        type: 'string',
                        description: 'Expected return on investment',
                      },
                      optimalAmount: {
                        type: 'string',
                        description: 'Optimal bribe amount',
                      },
                      timing: {
                        type: 'string',
                        description: 'Optimal timing for bribe placement',
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      '/api/tools/aerodrome/optimal-routing': {
        get: {
          summary: 'Get optimal routing',
          description: 'Retrieves optimal swap route between tokens',
          operationId: 'get-optimal-routing',
          parameters: [
            {
              name: 'tokenIn',
              in: 'query',
              required: true,
              schema: {
                type: 'string',
              },
              description: 'The input token address',
            },
            {
              name: 'tokenOut',
              in: 'query',
              required: true,
              schema: {
                type: 'string',
              },
              description: 'The output token address',
            },
            {
              name: 'amount',
              in: 'query',
              required: true,
              schema: {
                type: 'string',
              },
              description: 'The amount to swap',
            },
          ],
          responses: {
            '200': {
              description: 'Optimal route retrieved successfully',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      path: {
                        type: 'array',
                        items: {
                          type: 'string',
                        },
                        description: 'Array of pool addresses in the optimal path',
                      },
                      expectedOutput: {
                        type: 'string',
                        description: 'Expected output amount',
                      },
                      gasCost: {
                        type: 'string',
                        description: 'Estimated gas cost',
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      '/api/tools/aerodrome/portfolio-tracking': {
        get: {
          summary: 'Get portfolio tracking',
          description: 'Retrieves portfolio information for an address',
          operationId: 'get-portfolio-tracking',
          parameters: [
            {
              name: 'address',
              in: 'query',
              required: true,
              schema: {
                type: 'string',
              },
              description: 'The address to track',
            },
          ],
          responses: {
            '200': {
              description: 'Portfolio data retrieved successfully',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      totalValue: {
                        type: 'string',
                        description: 'Total portfolio value',
                      },
                      positions: {
                        type: 'array',
                        items: {
                          type: 'object',
                          properties: {
                            pool: {
                              type: 'object',
                              properties: {
                                id: {
                                  type: 'string',
                                  description: 'Pool address',
                                },
                                totalValueLockedUSD: {
                                  type: 'string',
                                  description: 'Pool TVL in USD',
                                },
                              },
                            },
                            value: {
                              type: 'string',
                              description: 'Position value',
                            },
                            rewards: {
                              type: 'string',
                              description: 'Pending rewards',
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      '/api/tools/aerodrome/pools-list': {
        get: {
          summary: 'Get Aerodrome pools list',
          description: 'Retrieves a list of Aerodrome pools with optional filtering and sorting',
          operationId: 'get-pools-list',
          parameters: [
            {
              name: 'token',
              in: 'query',
              required: false,
              schema: {
                type: 'string',
              },
              description: 'Filter pools by token address',
            },
            {
              name: 'minLiquidity',
              in: 'query',
              required: false,
              schema: {
                type: 'string',
              },
              description: 'Filter pools by minimum liquidity',
            },
            {
              name: 'minVolume',
              in: 'query',
              required: false,
              schema: {
                type: 'string',
              },
              description: 'Filter pools by minimum 24h volume',
            },
            {
              name: 'feeTier',
              in: 'query',
              required: false,
              schema: {
                type: 'string',
              },
              description: 'Filter pools by fee tier',
            },
            {
              name: 'limit',
              in: 'query',
              required: false,
              schema: {
                type: 'integer',
                default: 5,
              },
              description: 'Limit the number of pools returned',
            },
            {
              name: 'sortBy',
              in: 'query',
              required: false,
              schema: {
                type: 'string',
                enum: ['liquidity', 'volumeUSD', 'totalValueLockedUSD'],
              },
              description: 'Sort pools by field (default: liquidity)',
            },
            {
              name: 'sortOrder',
              in: 'query',
              required: false,
              schema: {
                type: 'string',
                enum: ['asc', 'desc'],
              },
              description: 'Sort order (default: desc)',
            },
          ],
          responses: {
            '200': {
              description: 'Pools list retrieved successfully',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      pools: {
                        type: 'array',
                        items: {
                          type: 'object',
                          properties: {
                            id: {
                              type: 'string',
                              description: 'Pool ID',
                            },
                            token0: {
                              type: 'object',
                              properties: {
                                id: {
                                  type: 'string',
                                  description: 'Token 0 ID',
                                },
                                symbol: {
                                  type: 'string',
                                  description: 'Token 0 symbol',
                                },
                                decimals: {
                                  type: 'number',
                                  description: 'Token 0 decimals',
                                },
                              },
                            },
                            token1: {
                              type: 'object',
                              properties: {
                                id: {
                                  type: 'string',
                                  description: 'Token 1 ID',
                                },
                                symbol: {
                                  type: 'string',
                                  description: 'Token 1 symbol',
                                },
                                decimals: {
                                  type: 'number',
                                  description: 'Token 1 decimals',
                                },
                              },
                            },
                            feeTier: {
                              type: 'string',
                              description: 'Pool fee tier',
                            },
                            liquidity: {
                              type: 'string',
                              description: 'Pool liquidity',
                            },
                            sqrtPrice: {
                              type: 'string',
                              description: 'Pool sqrt price',
                            },
                            tick: {
                              type: 'string',
                              description: 'Pool tick',
                            },
                            volumeToken0: {
                              type: 'string',
                              description: 'Volume in token0',
                            },
                            volumeToken1: {
                              type: 'string',
                              description: 'Volume in token1',
                            },
                            volumeUSD: {
                              type: 'string',
                              description: 'Volume in USD',
                            },
                            feesUSD: {
                              type: 'string',
                              description: 'Fees in USD',
                            },
                            totalValueLockedToken0: {
                              type: 'string',
                              description: 'TVL in token0',
                            },
                            totalValueLockedToken1: {
                              type: 'string',
                              description: 'TVL in token1',
                            },
                            totalValueLockedUSD: {
                              type: 'string',
                              description: 'TVL in USD',
                            },
                            txCount: {
                              type: 'string',
                              description: 'Transaction count',
                            },
                          },
                        },
                      },
                      total: {
                        type: 'number',
                        description: 'Total number of pools',
                      },
                      limit: {
                        type: 'number',
                        description: 'Limit used in the request',
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  };

  return NextResponse.json(pluginData);
}
