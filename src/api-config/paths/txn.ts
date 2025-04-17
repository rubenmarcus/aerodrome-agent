export const txnPaths = {
  '/api/tools/aerodrome/txn/swap': {
    post: {
      summary: 'Generate swap transaction',
      description: 'Generates transaction data for swapping tokens on Aerodrome',
      operationId: 'swap',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['chainId'],
              properties: {
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
  '/api/tools/aerodrome/txn/add-liquidity': {
    post: {
      summary: 'Generate add liquidity transaction',
      description: 'Generates transaction data for adding liquidity to Aerodrome pools',
      operationId: 'add-liquidity',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['chainId'],
              properties: {
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
  '/api/tools/aerodrome/txn/remove-liquidity': {
    post: {
      summary: 'Generate remove liquidity transaction',
      description: 'Generates transaction data for removing liquidity from Aerodrome pools',
      operationId: 'remove-liquidity',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['chainId'],
              properties: {
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
  '/api/tools/aerodrome/txn/stake': {
    post: {
      summary: 'Generate stake transaction',
      description: 'Generates transaction data for staking tokens on Aerodrome',
      operationId: 'stake',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['chainId'],
              properties: {
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
  '/api/tools/aerodrome/txn/unstake': {
    post: {
      summary: 'Generate unstake transaction',
      description: 'Generates transaction data for unstaking tokens from Aerodrome',
      operationId: 'unstake',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['chainId'],
              properties: {
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
  '/api/tools/aerodrome/txn/claim-rewards': {
    post: {
      summary: 'Generate claim rewards transaction',
      description: 'Generates transaction data for claiming rewards from Aerodrome',
      operationId: 'claim-rewards',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['chainId'],
              properties: {
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
  '/api/tools/aerodrome/txn/vote': {
    post: {
      summary: 'Generate vote transaction',
      description: 'Generates transaction data for voting on Aerodrome gauges',
      operationId: 'vote',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['chainId'],
              properties: {
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
  '/api/tools/aerodrome/txn/lock-ve': {
    post: {
      summary: 'Generate lock veAERO transaction',
      description: 'Generates transaction data for locking AERO tokens to get veAERO',
      operationId: 'lock-ve',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['chainId'],
              properties: {
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
  '/api/tools/aerodrome/txn/extend-lock': {
    post: {
      summary: 'Generate extend lock transaction',
      description: 'Generates transaction data for extending veAERO lock period',
      operationId: 'extend-lock',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['chainId'],
              properties: {
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
  '/api/tools/aerodrome/txn/increase-lock-amount': {
    post: {
      summary: 'Generate increase lock amount transaction',
      description: 'Generates transaction data for increasing veAERO lock amount',
      operationId: 'increase-lock-amount',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['chainId'],
              properties: {
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
  '/api/tools/aerodrome/txn/merge-locks': {
    post: {
      summary: 'Generate merge locks transaction',
      description: 'Generates transaction data for merging veAERO locks',
      operationId: 'merge-locks',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['chainId'],
              properties: {
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
  '/api/tools/aerodrome/txn/split-lock': {
    post: {
      summary: 'Generate split lock transaction',
      description: 'Generates transaction data for splitting veAERO locks',
      operationId: 'split-lock',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['chainId'],
              properties: {
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
  '/api/tools/aerodrome/txn/withdraw': {
    post: {
      summary: 'Generate withdraw transaction',
      description: 'Generates transaction data for withdrawing from Aerodrome',
      operationId: 'withdraw',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['chainId'],
              properties: {
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
  '/api/tools/aerodrome/txn/create-lock': {
    post: {
      summary: 'Generate create lock transaction',
      description: 'Generates transaction data for creating a new veAERO lock',
      operationId: 'create-lock',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['chainId'],
              properties: {
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
  '/api/tools/aerodrome/txn/create-bribe': {
    post: {
      summary: 'Generate create bribe transaction',
      description: 'Generates transaction data for creating a new bribe on Aerodrome',
      operationId: 'create-bribe',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['chainId'],
              properties: {
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
  '/api/tools/aerodrome/txn/deposit-bribe': {
    post: {
      summary: 'Generate deposit bribe transaction',
      description: 'Generates transaction data for depositing bribes on Aerodrome',
      operationId: 'deposit-bribe',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['chainId'],
              properties: {
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
  '/api/tools/aerodrome/txn/withdraw-bribe': {
    post: {
      summary: 'Generate withdraw bribe transaction',
      description: 'Generates transaction data for withdrawing bribes from Aerodrome',
      operationId: 'withdraw-bribe',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['chainId'],
              properties: {
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