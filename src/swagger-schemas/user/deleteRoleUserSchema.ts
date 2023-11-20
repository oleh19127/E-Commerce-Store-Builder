export const deleteRoleUserSchema = {
  schema: {
    description: 'Delete role from user',
    tags: ['user'],
    params: {
      type: 'object',
      properties: {
        userId: { type: 'number' },
      },
    },
    body: {
      type: 'object',
      properties: {
        roleName: { type: 'string' },
      },
    },
    response: {
      200: {
        type: 'object',
        properties: {
          userId: { type: 'number' },
          email: { type: 'string' },
          password: { type: 'string' },
          created_at: { type: 'string', format: 'date-time' },
          updated_at: { type: 'string', format: 'date-time' },
          roles: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                userId: { type: 'number' },
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
