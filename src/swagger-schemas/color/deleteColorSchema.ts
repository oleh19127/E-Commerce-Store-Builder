export const deleteColorSchema = {
  schema: {
    description: 'Delete color by id',
    tags: ['color'],
    params: {
      type: 'object',
      properties: {
        colorId: { type: 'number' },
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
