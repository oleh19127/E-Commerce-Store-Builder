import { FastifyPluginAsync } from 'fastify';
import { userController } from '../../controllers/userController';
import { getOneUserSchema } from '../../swagger-schemas/user/getOneUserSchema';
import { getAllUsersSchema } from '../../swagger-schemas/user/getAllUsersSchema';
import { createUserSchema } from '../../swagger-schemas/user/createUserSchema';
import { updateUserSchema } from '../../swagger-schemas/user/updateUserSchema';
import { deleteUserSchema } from '../../swagger-schemas/user/deleteUserSchema';
import { makeAdminUserSchema } from '../../swagger-schemas/user/makeAdminUserSchema';
import { loginUserSchema } from '../../swagger-schemas/user/loginUserSchema';

const user: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get('/one/:id', getOneUserSchema, userController.getOne);
  fastify.get('/all', getAllUsersSchema, userController.getAllUsers);
  fastify.post('/registration', createUserSchema, userController.createUser);
  fastify.put('/:id', updateUserSchema, userController.update);
  fastify.delete('/:id', deleteUserSchema, userController.delete);
  fastify.post(
    '/make-admin/:id',
    makeAdminUserSchema,
    userController.makeAdmin,
  );
  fastify.post('/login', loginUserSchema, userController.login);

  fastify.get('/auth', userController.auth);
};

export default user;
