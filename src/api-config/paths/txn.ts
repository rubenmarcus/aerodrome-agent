export const txnPaths = {
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
};