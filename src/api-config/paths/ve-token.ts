export const veTokenPaths = {
  '/api/tools/aerodrome/ve-token/lock-strategy': {
    get: {
      summary: 'Get lock strategy',
      description: 'Provides optimal locking strategy for veAERO tokens',
      operationId: 'get-lock-strategy',
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
          description: 'Lock strategy retrieved successfully',
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
                    description: 'Expected APR',
                  },
                  votingPower: {
                    type: 'string',
                    description: 'Expected voting power',
                  },
                  recommendations: {
                    type: 'array',
                    items: {
                      type: 'string',
                    },
                    description: 'List of recommendations for locking strategy',
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  '/api/tools/aerodrome/ve-token/rewards-calculator': {
    get: {
      summary: 'Calculate rewards',
      description: 'Calculates expected rewards for veAERO positions',
      operationId: 'calculate-rewards',
      parameters: [
        {
          name: 'veAeroBalance',
          in: 'query',
          required: true,
          schema: {
            type: 'string',
          },
          description: 'veAERO balance',
        },
        {
          name: 'lockDuration',
          in: 'query',
          required: true,
          schema: {
            type: 'number',
          },
          description: 'Lock duration in weeks',
        },
      ],
      responses: {
        '200': {
          description: 'Rewards calculation completed successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  weeklyRewards: {
                    type: 'string',
                    description: 'Expected weekly rewards',
                  },
                  annualRewards: {
                    type: 'string',
                    description: 'Expected annual rewards',
                  },
                  apr: {
                    type: 'string',
                    description: 'Expected APR',
                  },
                  votingPower: {
                    type: 'string',
                    description: 'Voting power',
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  '/api/tools/aerodrome/ve-token/boost-calculator': {
    get: {
      summary: 'Calculate boost',
      description: 'Calculates boost multiplier for veAERO positions',
      operationId: 'calculate-ve-boost',
      parameters: [
        {
          name: 'veAeroBalance',
          in: 'query',
          required: true,
          schema: {
            type: 'string',
          },
          description: 'veAERO balance',
        },
        {
          name: 'poolAddress',
          in: 'query',
          required: true,
          schema: {
            type: 'string',
          },
          description: 'Pool address',
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
};