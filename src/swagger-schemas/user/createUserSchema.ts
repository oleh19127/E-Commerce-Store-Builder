export const createUserSchema = {
  schema: {
    description: 'Create user',
    tags: ['user'],
    security: [{ apiKey: [] }],
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
          createdUser: { type: 'string' },
        },
      },
    },
  },
};
