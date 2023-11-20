export const deleteUserSchema = {
  schema: {
    description: 'Delete user by id',
    tags: ['user'],
    params: {
      type: 'object',
      properties: {
        userId: { type: 'number' },
      },
    },
    response: {
      200: {
        type: 'object',
        properties: {
          message: { type: 'string' },
        },
      },
    },
  },
};
