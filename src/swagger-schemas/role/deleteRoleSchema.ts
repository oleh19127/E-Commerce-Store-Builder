export const deleteRoleSchema = {
  schema: {
    description: 'Delete role by id',
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
          message: { type: 'string' },
        },
      },
    },
  },
};
