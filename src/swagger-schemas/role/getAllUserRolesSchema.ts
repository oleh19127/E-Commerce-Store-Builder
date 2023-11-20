export const getAllUserRolesSchema = {
  schema: {
    description: 'Get all user roles',
    tags: ['role'],
    params: {
      type: 'object',
      properties: {
        userId: { type: 'number' },
      },
    },
    response: {
      200: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            roleId: { type: 'number' },
            roleName: { type: 'string' },
            created_at: { type: 'string', format: 'date-time' },
            updated_at: { type: 'string', format: 'date-time' },
          },
        },
      },
    },
  },
};
