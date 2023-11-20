import { FastifyPluginAsync } from 'fastify';
import { userController } from '../../controllers/userController';
import { getOneUserSchema } from '../../swagger-schemas/user/getOneUserSchema';
import { getAllUsersSchema } from '../../swagger-schemas/user/getAllUsersSchema';
import { createUserSchema } from '../../swagger-schemas/user/createUserSchema';
import { updateUserSchema } from '../../swagger-schemas/user/updateUserSchema';
import { deleteUserSchema } from '../../swagger-schemas/user/deleteUserSchema';
import { addRoleUserSchema } from '../../swagger-schemas/user/addRoleUserSchema';
import { loginUserSchema } from '../../swagger-schemas/user/loginUserSchema';

const user: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get('/one/:userId', getOneUserSchema, userController.getOne);
  fastify.get('/all', getAllUsersSchema, userController.getAllUsers);
  fastify.post('/registration', createUserSchema, userController.createUser);
  fastify.put('/:userId', updateUserSchema, userController.update);
  fastify.delete('/:userId', deleteUserSchema, userController.delete);
  fastify.post('/add-role/:roleId', addRoleUserSchema, userController.addRole);
  fastify.post('/login', loginUserSchema, userController.login);

  fastify.get('/auth', userController.auth);
};

export default user;
