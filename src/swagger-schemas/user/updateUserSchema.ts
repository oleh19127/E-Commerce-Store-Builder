export const updateUserSchema = {
  schema: {
    description: 'Update user info',
    tags: ['user'],
    security: [{ apiKey: [] }],
    params: {
      type: 'object',
      properties: {
        userId: {
          type: 'number',
          description: 'user id',
        },
      },
    },
    body: {
      type: 'object',
      properties: {
        email: { type: 'string' },
        password: { type: 'string' },
      },
    },
    response: {
      201: {
        description: 'Successful response',
        type: 'object',
        properties: {
          userId: { type: 'number' },
          email: { type: 'string' },
          password: { type: 'string' },
          created_at: { type: 'string', format: 'date-time' },
          updated_at: { type: 'string', format: 'date-time' },
        },
      },
    },
  },
};
