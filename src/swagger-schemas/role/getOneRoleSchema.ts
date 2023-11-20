export const getOneRoleSchema = {
  schema: {
    description: 'Get one role by id',
    tags: ['role'],
    params: {
      type: 'object',
      properties: {
        roleId: { type: 'number' },
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
