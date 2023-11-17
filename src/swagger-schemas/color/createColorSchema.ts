export const createColorSchema = {
  schema: {
    description: 'Create color',
    tags: ['color'],
    body: {
      type: 'object',
      properties: {
        colorValue: { type: 'string' },
      },
    },
    response: {
      201: {
        type: 'object',
        properties: {
          id: { type: 'number' },
          colorValue: { type: 'string' },
          created_at: { type: 'string', format: 'date-time' },
          updated_at: { type: 'string', format: 'date-time' },
        },
      },
    },
  },
};
