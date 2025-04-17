export const positionPaths = {
  '/api/tools/aerodrome/analytics/position-management': {
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
};
