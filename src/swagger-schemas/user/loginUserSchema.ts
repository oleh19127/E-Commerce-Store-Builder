export const loginUserSchema = {
  schema: {
    description: 'Make user admin by id',
    tags: ['user'],
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
          result: { type: 'string' },
        },
      },
    },
  },
};
