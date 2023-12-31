export const updateColorSchema = {
  schema: {
    description: 'Update color by id',
    tags: ['color'],
    params: {
      type: 'object',
      properties: {
        colorId: { type: 'number' },
      },
    },
    body: {
      type: 'object',
      properties: {
        colorValue: { type: 'string' },
      },
    },
    response: {
      200: {
        type: 'object',
        properties: {
          colorId: { type: 'number' },
          colorValue: { type: 'string' },
          created_at: { type: 'string', format: 'date-time' },
          updated_at: { type: 'string', format: 'date-time' },
        },
      },
    },
  },
};
