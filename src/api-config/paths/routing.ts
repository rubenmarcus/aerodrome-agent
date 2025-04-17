export const routingPaths = {
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
};