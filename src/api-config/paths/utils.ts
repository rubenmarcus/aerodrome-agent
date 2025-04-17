export const utilsPaths = {
  '/api/tools/aerodrome/utils/pool-summary': {
    get: {
      summary: 'Get pool summary',
      description: 'Retrieves a summary of pool information including key metrics',
      operationId: 'get-pool-summary',
      parameters: [
        {
          name: 'poolAddress',
          in: 'query',
          required: true,
          schema: {
            type: 'string',
          },
          description: 'The pool address to get summary for',
        },
      ],
      responses: {
        '200': {
          description: 'Pool summary retrieved successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  tvl: {
                    type: 'string',
                    description: 'Total Value Locked in USD',
                  },
                  volume24h: {
                    type: 'string',
                    description: '24-hour trading volume in USD',
                  },
                  fees24h: {
                    type: 'string',
                    description: '24-hour fees in USD',
                  },
                  apr: {
                    type: 'string',
                    description: 'Current APR',
                  },
                  token0: {
                    type: 'object',
                    properties: {
                      symbol: {
                        type: 'string',
                        description: 'Token 0 symbol',
                      },
                      price: {
                        type: 'string',
                        description: 'Token 0 price in USD',
                      },
                    },
                  },
                  token1: {
                    type: 'object',
                    properties: {
                      symbol: {
                        type: 'string',
                        description: 'Token 1 symbol',
                      },
                      price: {
                        type: 'string',
                        description: 'Token 1 price in USD',
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
  '/api/tools/aerodrome/utils/position-health': {
    get: {
      summary: 'Get position health',
      description: 'Analyzes the health of a liquidity position',
      operationId: 'get-position-health',
      parameters: [
        {
          name: 'poolAddress',
          in: 'query',
          required: true,
          schema: {
            type: 'string',
          },
          description: 'The pool address of the position',
        },
        {
          name: 'positionId',
          in: 'query',
          required: true,
          schema: {
            type: 'string',
          },
          description: 'The position ID to analyze',
        },
      ],
      responses: {
        '200': {
          description: 'Position health analysis retrieved successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  healthScore: {
                    type: 'number',
                    description: 'Position health score (0-100)',
                  },
                  impermanentLoss: {
                    type: 'string',
                    description: 'Current impermanent loss percentage',
                  },
                  feesEarned: {
                    type: 'string',
                    description: 'Total fees earned',
                  },
                  recommendations: {
                    type: 'array',
                    items: {
                      type: 'string',
                    },
                    description: 'List of recommendations to improve position health',
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  '/api/tools/aerodrome/utils/optimal-lock-duration': {
    get: {
      summary: 'Get optimal lock duration',
      description: 'Calculates the optimal lock duration for veAERO tokens',
      operationId: 'get-optimal-lock-duration',
      parameters: [
        {
          name: 'amount',
          in: 'query',
          required: true,
          schema: {
            type: 'string',
          },
          description: 'Amount of AERO to lock',
        },
        {
          name: 'targetApr',
          in: 'query',
          required: false,
          schema: {
            type: 'string',
          },
          description: 'Target APR (optional)',
        },
      ],
      responses: {
        '200': {
          description: 'Optimal lock duration calculated successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  optimalDuration: {
                    type: 'number',
                    description: 'Optimal lock duration in weeks',
                  },
                  expectedApr: {
                    type: 'string',
                    description: 'Expected APR at optimal duration',
                  },
                  votingPower: {
                    type: 'string',
                    description: 'Expected voting power',
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  '/api/tools/aerodrome/utils/simulate-swap': {
    get: {
      summary: 'Simulate swap',
      description: 'Simulates a token swap to estimate output amount and price impact',
      operationId: 'simulate-swap',
      parameters: [
        {
          name: 'tokenIn',
          in: 'query',
          required: true,
          schema: {
            type: 'string',
          },
          description: 'Input token address',
        },
        {
          name: 'tokenOut',
          in: 'query',
          required: true,
          schema: {
            type: 'string',
          },
          description: 'Output token address',
        },
        {
          name: 'amountIn',
          in: 'query',
          required: true,
          schema: {
            type: 'string',
          },
          description: 'Amount of input token',
        },
      ],
      responses: {
        '200': {
          description: 'Swap simulation completed successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  amountOut: {
                    type: 'string',
                    description: 'Estimated output amount',
                  },
                  priceImpact: {
                    type: 'string',
                    description: 'Price impact percentage',
                  },
                  route: {
                    type: 'array',
                    items: {
                      type: 'string',
                    },
                    description: 'Array of pool addresses in the route',
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  '/api/tools/aerodrome/utils/boost-calculator': {
    get: {
      summary: 'Calculate boost',
      description: 'Calculates the boost multiplier for a position',
      operationId: 'calculate-boost',
      parameters: [
        {
          name: 'poolAddress',
          in: 'query',
          required: true,
          schema: {
            type: 'string',
          },
          description: 'Pool address',
        },
        {
          name: 'veAeroBalance',
          in: 'query',
          required: true,
          schema: {
            type: 'string',
          },
          description: 'veAERO balance',
        },
      ],
      responses: {
        '200': {
          description: 'Boost calculation completed successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  boost: {
                    type: 'string',
                    description: 'Boost multiplier',
                  },
                  minVeAero: {
                    type: 'string',
                    description: 'Minimum veAERO required for max boost',
                  },
                  currentApr: {
                    type: 'string',
                    description: 'Current APR without boost',
                  },
                  boostedApr: {
                    type: 'string',
                    description: 'APR with current boost',
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  '/api/tools/aerodrome/utils/apr-calculator': {
    get: {
      summary: 'Calculate APR',
      description: 'Calculates the APR for a pool or position',
      operationId: 'calculate-apr',
      parameters: [
        {
          name: 'poolAddress',
          in: 'query',
          required: true,
          schema: {
            type: 'string',
          },
          description: 'Pool address',
        },
        {
          name: 'includeFees',
          in: 'query',
          required: false,
          schema: {
            type: 'boolean',
            default: true,
          },
          description: 'Include trading fees in calculation',
        },
      ],
      responses: {
        '200': {
          description: 'APR calculation completed successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  apr: {
                    type: 'string',
                    description: 'Annual Percentage Rate',
                  },
                  components: {
                    type: 'object',
                    properties: {
                      tradingFees: {
                        type: 'string',
                        description: 'APR from trading fees',
                      },
                      emissions: {
                        type: 'string',
                        description: 'APR from emissions',
                      },
                      bribes: {
                        type: 'string',
                        description: 'APR from bribes',
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
  '/api/tools/aerodrome/utils/slippage-calculator': {
    get: {
      summary: 'Calculate slippage',
      description: 'Calculates the expected slippage for a swap',
      operationId: 'calculate-slippage',
      parameters: [
        {
          name: 'poolAddress',
          in: 'query',
          required: true,
          schema: {
            type: 'string',
          },
          description: 'Pool address',
        },
        {
          name: 'amount',
          in: 'query',
          required: true,
          schema: {
            type: 'string',
          },
          description: 'Swap amount',
        },
        {
          name: 'isExactInput',
          in: 'query',
          required: true,
          schema: {
            type: 'boolean',
          },
          description: 'Whether the amount is input or output',
        },
      ],
      responses: {
        '200': {
          description: 'Slippage calculation completed successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  slippage: {
                    type: 'string',
                    description: 'Expected slippage percentage',
                  },
                  priceImpact: {
                    type: 'string',
                    description: 'Price impact percentage',
                  },
                  minOutput: {
                    type: 'string',
                    description: 'Minimum output amount (for exact input)',
                  },
                  maxInput: {
                    type: 'string',
                    description: 'Maximum input amount (for exact output)',
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  '/api/tools/aerodrome/utils/token-info': {
    get: {
      summary: 'Get token info',
      description: 'Retrieves information about a token',
      operationId: 'get-token-info',
      parameters: [
        {
          name: 'tokenAddress',
          in: 'query',
          required: true,
          schema: {
            type: 'string',
          },
          description: 'Token address',
        },
      ],
      responses: {
        '200': {
          description: 'Token info retrieved successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  symbol: {
                    type: 'string',
                    description: 'Token symbol',
                  },
                  name: {
                    type: 'string',
                    description: 'Token name',
                  },
                  decimals: {
                    type: 'number',
                    description: 'Token decimals',
                  },
                  price: {
                    type: 'string',
                    description: 'Current price in USD',
                  },
                  totalSupply: {
                    type: 'string',
                    description: 'Total token supply',
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