export const analyticsPaths = {
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
};