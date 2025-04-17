export const analyticsPaths = {
  '/api/tools/aerodrome/analytics/pool-analytics': {
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
  '/api/tools/aerodrome/analytics/gauge-analysis': {
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
  '/api/tools/aerodrome/analytics/bribe-market': {
    get: {
      summary: 'Get bribe market status',
      description: 'Retrieves comprehensive bribe market status for a gauge',
      operationId: 'get-bribe-market-status',
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
          description: 'Bribe market status retrieved successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  gaugeAddress: {
                    type: 'string',
                    description: 'The gauge address',
                  },
                  metrics: {
                    type: 'object',
                    properties: {
                      totalVotes: {
                        type: 'string',
                        description: 'Total votes in the gauge',
                      },
                      currentApr: {
                        type: 'string',
                        description: 'Current APR of the gauge',
                      },
                      totalBribeValue: {
                        type: 'string',
                        description: 'Total value of active bribes',
                      },
                      averageBribeApr: {
                        type: 'string',
                        description: 'Average APR of active bribes',
                      },
                    },
                  },
                  rewardToken: {
                    type: 'object',
                    properties: {
                      address: {
                        type: 'string',
                        description: 'Reward token address',
                      },
                      symbol: {
                        type: 'string',
                        description: 'Reward token symbol',
                      },
                      decimals: {
                        type: 'number',
                        description: 'Reward token decimals',
                      },
                    },
                  },
                  activeBribes: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        token: {
                          type: 'string',
                          description: 'Bribe token address',
                        },
                        amount: {
                          type: 'string',
                          description: 'Bribe amount',
                        },
                        apr: {
                          type: 'string',
                          description: 'Bribe APR',
                        },
                        duration: {
                          type: 'string',
                          description: 'Bribe duration',
                        },
                      },
                    },
                  },
                  strategy: {
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
                  recommendations: {
                    type: 'array',
                    items: {
                      type: 'string',
                    },
                    description: 'Recommendations for bribe participation',
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  '/api/tools/aerodrome/analytics/portfolio-tracking': {
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
  '/api/tools/aerodrome/analytics/optimal-routing': {
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
  '/api/tools/aerodrome/analytics/position-management': {
    get: {
      summary: 'Get position management',
      description: 'Retrieves optimal position management strategies',
      operationId: 'get-position-management',
      parameters: [
        {
          name: 'poolAddress',
          in: 'query',
          required: true,
          schema: {
            type: 'string',
          },
          description: 'The pool address',
        },
        {
          name: 'action',
          in: 'query',
          required: true,
          schema: {
            type: 'string',
            enum: ['enter', 'exit'],
          },
          description: 'The action to perform (enter or exit)',
        },
        {
          name: 'amount',
          in: 'query',
          required: true,
          schema: {
            type: 'string',
          },
          description: 'The amount to enter or exit',
        },
      ],
      responses: {
        '200': {
          description: 'Position management strategy retrieved successfully',
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
  '/api/tools/aerodrome/analytics/fee-collection': {
    get: {
      summary: 'Get fee collection analytics',
      description: 'Retrieves fee collection data and trends for pools',
      operationId: 'get-fee-collection',
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
        {
          name: 'timeframe',
          in: 'query',
          required: false,
          schema: {
            type: 'string',
            enum: ['24h', '7d', '30d', '90d'],
          },
          description: 'Timeframe for fee collection analysis',
        },
      ],
      responses: {
        '200': {
          description: 'Fee collection data retrieved successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  poolAddress: {
                    type: 'string',
                    description: 'The pool address',
                  },
                  metrics: {
                    type: 'object',
                    properties: {
                      totalFees: {
                        type: 'string',
                        description: 'Total fees collected',
                      },
                      feeTrend: {
                        type: 'string',
                        description: 'Fee collection trend',
                      },
                      feeDistribution: {
                        type: 'object',
                        properties: {
                          token0: {
                            type: 'string',
                            description: 'Fees in token0',
                          },
                          token1: {
                            type: 'string',
                            description: 'Fees in token1',
                          },
                        },
                      },
                      historicalData: {
                        type: 'array',
                        items: {
                          type: 'object',
                          properties: {
                            timestamp: {
                              type: 'number',
                              description: 'Timestamp of the data point',
                            },
                            fees: {
                              type: 'string',
                              description: 'Fees collected at this timestamp',
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
    },
  },
  '/api/tools/aerodrome/analytics/pool-creation': {
    get: {
      summary: 'Get pool creation analytics',
      description: 'Provides analytics and recommendations for creating new pools',
      operationId: 'get-pool-creation-analytics',
      parameters: [
        {
          name: 'token0',
          in: 'query',
          required: true,
          schema: {
            type: 'string',
          },
          description: 'First token address',
        },
        {
          name: 'token1',
          in: 'query',
          required: true,
          schema: {
            type: 'string',
          },
          description: 'Second token address',
        },
        {
          name: 'initialLiquidity',
          in: 'query',
          required: false,
          schema: {
            type: 'string',
          },
          description: 'Initial liquidity amount (optional)',
        },
      ],
      responses: {
        '200': {
          description: 'Pool creation analytics retrieved successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  analysis: {
                    type: 'object',
                    properties: {
                      marketDemand: {
                        type: 'string',
                        description: 'Market demand score',
                      },
                      riskAssessment: {
                        type: 'string',
                        description: 'Risk assessment score',
                      },
                      potentialVolume: {
                        type: 'string',
                        description: 'Potential trading volume',
                      },
                      feeTierRecommendation: {
                        type: 'string',
                        description: 'Recommended fee tier',
                      },
                    },
                  },
                  recommendations: {
                    type: 'array',
                    items: {
                      type: 'string',
                    },
                    description: 'List of recommendations for pool creation',
                  },
                  marketData: {
                    type: 'object',
                    properties: {
                      similarPools: {
                        type: 'array',
                        items: {
                          type: 'object',
                          properties: {
                            poolAddress: {
                              type: 'string',
                              description: 'Similar pool address',
                            },
                            tvl: {
                              type: 'string',
                              description: 'TVL of similar pool',
                            },
                            volume24h: {
                              type: 'string',
                              description: '24h volume of similar pool',
                            },
                          },
                        },
                      },
                      tokenMetrics: {
                        type: 'object',
                        properties: {
                          token0: {
                            type: 'object',
                            properties: {
                              marketCap: {
                                type: 'string',
                                description: 'Market cap of token0',
                              },
                              liquidity: {
                                type: 'string',
                                description: 'Total liquidity of token0',
                              },
                            },
                          },
                          token1: {
                            type: 'object',
                            properties: {
                              marketCap: {
                                type: 'string',
                                description: 'Market cap of token1',
                              },
                              liquidity: {
                                type: 'string',
                                description: 'Total liquidity of token1',
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
      },
    },
  },
  '/api/tools/aerodrome/analytics/yield-optimization': {
    get: {
      summary: 'Get yield optimization',
      description: 'Retrieves optimal yield farming strategies based on risk tolerance',
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
        {
          name: 'amount',
          in: 'query',
          required: true,
          schema: {
            type: 'string',
          },
          description: 'Amount to optimize for',
        },
        {
          name: 'token',
          in: 'query',
          required: false,
          schema: {
            type: 'string',
          },
          description: 'Token to optimize for (optional)',
        },
      ],
      responses: {
        '200': {
          description: 'Yield optimization strategy retrieved successfully',
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
                        poolAddress: {
                          type: 'string',
                          description: 'Pool address',
                        },
                        allocation: {
                          type: 'string',
                          description: 'Recommended allocation percentage',
                        },
                        expectedApr: {
                          type: 'string',
                          description: 'Expected APR',
                        },
                        riskScore: {
                          type: 'string',
                          description: 'Risk score',
                        },
                        impermanentLoss: {
                          type: 'string',
                          description: 'Expected impermanent loss',
                        },
                      },
                    },
                  },
                  totalExpectedApr: {
                    type: 'string',
                    description: 'Total expected APR for the strategy',
                  },
                  riskMetrics: {
                    type: 'object',
                    properties: {
                      overallRisk: {
                        type: 'string',
                        description: 'Overall risk score',
                      },
                      diversification: {
                        type: 'string',
                        description: 'Diversification score',
                      },
                      volatility: {
                        type: 'string',
                        description: 'Expected volatility',
                      },
                    },
                  },
                  recommendations: {
                    type: 'array',
                    items: {
                      type: 'string',
                    },
                    description: 'List of recommendations for yield optimization',
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  '/api/tools/aerodrome/analytics/gauge-eligibility': {
    get: {
      summary: 'Get gauge eligibility',
      description: 'Checks if a pool is eligible for gauge creation',
      operationId: 'get-gauge-eligibility',
      parameters: [
        {
          name: 'poolAddress',
          in: 'query',
          required: true,
          schema: {
            type: 'string',
          },
          description: 'The pool address to check',
        },
      ],
      responses: {
        '200': {
          description: 'Gauge eligibility check completed successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  poolAddress: {
                    type: 'string',
                    description: 'The pool address',
                  },
                  totalSupply: {
                    type: 'string',
                    description: 'Total supply of pool tokens',
                  },
                  tokens: {
                    type: 'object',
                    properties: {
                      token0: {
                        type: 'string',
                        description: 'Address of token0',
                      },
                      token1: {
                        type: 'string',
                        description: 'Address of token1',
                      },
                    },
                  },
                  eligibility: {
                    type: 'object',
                    properties: {
                      hasEnoughLiquidity: {
                        type: 'boolean',
                        description: 'Whether the pool has enough liquidity',
                      },
                      isStablePool: {
                        type: 'boolean',
                        description: 'Whether the pool is a stable pool',
                      },
                      meetsMinimumTVL: {
                        type: 'boolean',
                        description: 'Whether the pool meets minimum TVL requirements',
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
  '/api/tools/aerodrome/analytics/voting-power': {
    get: {
      summary: 'Get voting power',
      description: 'Retrieves voting power information for an address',
      operationId: 'get-voting-power',
      parameters: [
        {
          name: 'address',
          in: 'query',
          required: true,
          schema: {
            type: 'string',
          },
          description: 'The address to check',
        },
      ],
      responses: {
        '200': {
          description: 'Voting power retrieved successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  address: {
                    type: 'string',
                    description: 'The address',
                  },
                  votingPower: {
                    type: 'string',
                    description: 'Total voting power',
                  },
                  veTokenBalance: {
                    type: 'string',
                    description: 'veToken balance',
                  },
                  lockEnd: {
                    type: 'string',
                    description: 'Lock end timestamp',
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  '/api/tools/aerodrome/analytics/gauge-info': {
    get: {
      summary: 'Get gauge information',
      description: 'Retrieves detailed information about a gauge',
      operationId: 'get-gauge-info',
      parameters: [
        {
          name: 'gaugeAddress',
          in: 'query',
          required: true,
          schema: {
            type: 'string',
          },
          description: 'The gauge address',
        },
      ],
      responses: {
        '200': {
          description: 'Gauge information retrieved successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  gaugeAddress: {
                    type: 'string',
                    description: 'The gauge address',
                  },
                  poolAddress: {
                    type: 'string',
                    description: 'Associated pool address',
                  },
                  emissions: {
                    type: 'string',
                    description: 'Current emissions rate',
                  },
                  totalVotes: {
                    type: 'string',
                    description: 'Total votes in the gauge',
                  },
                  rewardToken: {
                    type: 'string',
                    description: 'Reward token address',
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  '/api/tools/aerodrome/analytics/bribe-info': {
    get: {
      summary: 'Get bribe information',
      description: 'Retrieves detailed information about bribes for a gauge',
      operationId: 'get-bribe-info',
      parameters: [
        {
          name: 'gaugeAddress',
          in: 'query',
          required: true,
          schema: {
            type: 'string',
          },
          description: 'The gauge address',
        },
      ],
      responses: {
        '200': {
          description: 'Bribe information retrieved successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  gaugeAddress: {
                    type: 'string',
                    description: 'The gauge address',
                  },
                  activeBribes: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        token: {
                          type: 'string',
                          description: 'Bribe token address',
                        },
                        amount: {
                          type: 'string',
                          description: 'Bribe amount',
                        },
                        apr: {
                          type: 'string',
                          description: 'Bribe APR',
                        },
                        duration: {
                          type: 'string',
                          description: 'Bribe duration',
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
  '/api/tools/aerodrome/analytics/pools-list': {
    get: {
      summary: 'Get pools list',
      description: 'Retrieves a list of all pools',
      operationId: 'get-pools-list',
      parameters: [
        {
          name: 'page',
          in: 'query',
          required: false,
          schema: {
            type: 'number',
          },
          description: 'Page number',
        },
        {
          name: 'limit',
          in: 'query',
          required: false,
          schema: {
            type: 'number',
          },
          description: 'Number of items per page',
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
                        address: {
                          type: 'string',
                          description: 'Pool address',
                        },
                        token0: {
                          type: 'string',
                          description: 'Token0 address',
                        },
                        token1: {
                          type: 'string',
                          description: 'Token1 address',
                        },
                        tvl: {
                          type: 'string',
                          description: 'Total value locked',
                        },
                        volume24h: {
                          type: 'string',
                          description: '24-hour volume',
                        },
                      },
                    },
                  },
                  total: {
                    type: 'number',
                    description: 'Total number of pools',
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  '/api/tools/aerodrome/analytics/bribe-strategy': {
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
          description: 'The gauge address',
        },
        {
          name: 'amount',
          in: 'query',
          required: true,
          schema: {
            type: 'string',
          },
          description: 'Amount to bribe',
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
                  gaugeAddress: {
                    type: 'string',
                    description: 'The gauge address',
                  },
                  strategy: {
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
    },
  },
  '/api/tools/aerodrome/analytics/ve-token-analysis': {
    get: {
      summary: 'Get veToken analysis',
      description: 'Retrieves analysis of veToken holdings and strategies',
      operationId: 'get-ve-token-analysis',
      parameters: [
        {
          name: 'address',
          in: 'query',
          required: true,
          schema: {
            type: 'string',
          },
          description: 'The address to analyze',
        },
      ],
      responses: {
        '200': {
          description: 'veToken analysis retrieved successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  address: {
                    type: 'string',
                    description: 'The address',
                  },
                  veTokenBalance: {
                    type: 'string',
                    description: 'veToken balance',
                  },
                  votingPower: {
                    type: 'string',
                    description: 'Current voting power',
                  },
                  lockEnd: {
                    type: 'string',
                    description: 'Lock end timestamp',
                  },
                  strategies: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        gaugeAddress: {
                          type: 'string',
                          description: 'Gauge address',
                        },
                        optimalVotes: {
                          type: 'string',
                          description: 'Optimal number of votes',
                        },
                        expectedRewards: {
                          type: 'string',
                          description: 'Expected rewards',
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
};