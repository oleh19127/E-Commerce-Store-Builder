export const updateRoleSchema = {
  schema: {
    description: 'Update role',
    tags: ['role'],
    params: {
      type: 'object',
      properties: {
        roleId: { type: 'number' },
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
          roleId: { type: 'number' },
          roleName: { type: 'string' },
          created_at: { type: 'string', format: 'date-time' },
          updated_at: { type: 'string', format: 'date-time' },
        },
      },
    },
  },
};
