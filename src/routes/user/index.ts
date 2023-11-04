import { FastifyPluginAsync } from 'fastify';
import { userController } from '../../controllers/userController';

const user: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get(
    '/one/:id',
    {
      schema: {
        description: 'Get one user by id',
        tags: ['user'],
        params: {
          type: 'object',
          properties: {
            id: { type: 'number' },
          },
        },
        response: {
          200: {
            type: 'object',
            properties: {
              id: { type: 'number' },
              email: { type: 'string' },
              password: { type: 'string' },
              created_at: { type: 'string', format: 'date-time' },
              updated_at: { type: 'string', format: 'date-time' },
              roles: {
                type: 'array',
                items: {
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
          },
        },
      },
    },
    userController.getOne,
  );
  fastify.get(
    '/all',
    {
      schema: {
        description: 'Get all users',
        tags: ['user'],
        response: {
          200: {
            type: 'array',
            items: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: { type: 'number' },
                  email: { type: 'string' },
                  password: { type: 'string' },
                  created_at: { type: 'string', format: 'date-time' },
                  updated_at: { type: 'string', format: 'date-time' },
                  roles: {
                    type: 'array',
                    items: {
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
              },
            },
          },
        },
      },
    },
    userController.getAllUsers,
  );

  fastify.post(
    '/registration',
    {
      schema: {
        description: 'Create user',
        tags: ['user'],
        security: [{ apiKey: [] }],
        body: {
          type: 'object',
          properties: {
            email: { type: 'string' },
            password: { type: 'string' },
          },
        },
        response: {
          201: {
            description: 'Successful response',
            type: 'object',
            properties: {
              createdUser: { type: 'string' },
            },
          },
        },
      },
    },
    userController.createUser,
  );

  fastify.put(
    '/:id',
    {
      schema: {
        description: 'Update user info',
        tags: ['user'],
        security: [{ apiKey: [] }],
        params: {
          type: 'object',
          properties: {
            id: {
              type: 'number',
              description: 'user id',
            },
          },
        },
        body: {
          type: 'object',
          properties: {
            email: { type: 'string' },
            password: { type: 'string' },
          },
        },
        response: {
          201: {
            description: 'Successful response',
            type: 'object',
            properties: {
              id: { type: 'number' },
              email: { type: 'string' },
              password: { type: 'string' },
              created_at: { type: 'string', format: 'date-time' },
              updated_at: { type: 'string', format: 'date-time' },
            },
          },
        },
      },
    },
    userController.update,
  );
  fastify.delete(
    '/:id',
    {
      schema: {
        description: 'Delete user by id',
        tags: ['user'],
        params: {
          type: 'object',
          properties: {
            id: { type: 'number' },
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
    },
    userController.delete,
  );

  fastify.post(
    '/make-admin/:id',
    {
      schema: {
        description: 'Make user admin by id',
        tags: ['user'],
        params: {
          type: 'object',
          properties: {
            id: { type: 'number' },
          },
        },
        response: {
          200: {
            type: 'object',
            properties: {
              id: { type: 'number' },
              email: { type: 'string' },
              password: { type: 'string' },
              created_at: { type: 'string', format: 'date-time' },
              updated_at: { type: 'string', format: 'date-time' },
              roles: {
                type: 'array',
                items: {
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
          },
        },
      },
    },
    userController.makeAdmin,
  );
  fastify.post(
    '/login',
    {
      schema: {
        description: 'Make user admin by id',
        tags: ['user'],
        body: {
          type: 'object',
          properties: {
            email: { type: 'string' },
            password: { type: 'string' },
          },
        },
        response: {
          201: {
            description: 'Successful response',
            type: 'object',
            properties: {
              result: { type: 'string' },
            },
          },
        },
      },
    },
    userController.login,
  );
  fastify.get('/auth', userController.auth);
};

export default user;
