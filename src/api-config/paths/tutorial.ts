export const tutorialPaths = {
  '/api/tools/aerodrome/tutorial/common-mistakes': {
    get: {
      summary: 'Get common mistakes',
      description: 'Retrieves common mistakes and how to avoid them',
      operationId: 'get-common-mistakes',
      parameters: [
        {
          name: 'topic',
          in: 'query',
          required: false,
          schema: {
            type: 'string',
            enum: ['liquidity', 'locking', 'voting', 'bribing'],
          },
          description: 'Topic to get mistakes for (optional)',
        },
      ],
      responses: {
        '200': {
          description: 'Common mistakes retrieved successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  mistakes: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        title: {
                          type: 'string',
                          description: 'Title of the mistake',
                        },
                        description: {
                          type: 'string',
                          description: 'Description of the mistake',
                        },
                        solution: {
                          type: 'string',
                          description: 'How to avoid the mistake',
                        },
                        severity: {
                          type: 'string',
                          enum: ['low', 'medium', 'high'],
                          description: 'Severity of the mistake',
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
  '/api/tools/aerodrome/tutorial/explain-concept': {
    get: {
      summary: 'Explain concept',
      description: 'Explains a specific concept in detail',
      operationId: 'explain-concept',
      parameters: [
        {
          name: 'concept',
          in: 'query',
          required: true,
          schema: {
            type: 'string',
            enum: [
              've-token',
              'boost',
              'bribing',
              'voting',
              'impermanent-loss',
              'slippage',
            ],
          },
          description: 'Concept to explain',
        },
        {
          name: 'level',
          in: 'query',
          required: false,
          schema: {
            type: 'string',
            enum: ['beginner', 'intermediate', 'advanced'],
          },
          description: 'Explanation level (optional)',
        },
      ],
      responses: {
        '200': {
          description: 'Concept explanation retrieved successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  title: {
                    type: 'string',
                    description: 'Title of the concept',
                  },
                  explanation: {
                    type: 'string',
                    description: 'Detailed explanation',
                  },
                  examples: {
                    type: 'array',
                    items: {
                      type: 'string',
                    },
                    description: 'Examples of the concept',
                  },
                  tips: {
                    type: 'array',
                    items: {
                      type: 'string',
                    },
                    description: 'Tips related to the concept',
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  '/api/tools/aerodrome/tutorial/main-tutorial': {
    get: {
      summary: 'Get main tutorial',
      description: 'Retrieves the main tutorial guide',
      operationId: 'get-main-tutorial',
      parameters: [
        {
          name: 'section',
          in: 'query',
          required: false,
          schema: {
            type: 'string',
            enum: [
              'getting-started',
              'liquidity',
              've-tokens',
              'voting',
              'bribing',
              'advanced',
            ],
          },
          description: 'Specific section to retrieve (optional)',
        },
      ],
      responses: {
        '200': {
          description: 'Tutorial retrieved successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  title: {
                    type: 'string',
                    description: 'Title of the tutorial section',
                  },
                  content: {
                    type: 'string',
                    description: 'Tutorial content',
                  },
                  steps: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        title: {
                          type: 'string',
                          description: 'Step title',
                        },
                        description: {
                          type: 'string',
                          description: 'Step description',
                        },
                        code: {
                          type: 'string',
                          description: 'Example code (if applicable)',
                        },
                      },
                    },
                  },
                  nextSteps: {
                    type: 'array',
                    items: {
                      type: 'string',
                    },
                    description: 'Suggested next steps',
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