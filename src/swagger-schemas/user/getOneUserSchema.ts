export const getOneUserSchema = {
  schema: {
    description: 'Get one user by id',
    tags: ['user'],
    params: {
      type: 'object',
      properties: {
        id: { type: 'number' },
      },
    },
    response: {
      200: {
        type: 'object',
        properties: {
          id: { type: 'number' },
          email: { type: 'string' },
          password: { type: 'string' },
          created_at: { type: 'string', format: 'date-time' },
          updated_at: { type: 'string', format: 'date-time' },
          roles: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: { type: 'number' },
                roleName: { type: 'string' },
                created_at: { type: 'string', format: 'date-time' },
                updated_at: { type: 'string', format: 'date-time' },
              },
            },
          },
        },
      },
    },
  },
};
