export const createRoleSchema = {
  schema: {
    description: 'Create role',
    tags: ['role'],
    body: {
      type: 'object',
      properties: {
        roleName: { type: 'string' },
      },
    },
    response: {
      201: {
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
};
