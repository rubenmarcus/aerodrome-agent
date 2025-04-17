export const poolsPaths = {
  '/api/tools/aerodrome/analytics/pools-list': {
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
};
