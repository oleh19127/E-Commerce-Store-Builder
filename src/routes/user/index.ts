import { FastifyPluginAsync } from 'fastify';
import { userController } from '../../controllers/userController';

const user: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get('/all/:userId', userController.getAllUsers);
  fastify.get('/one/:id', userController.getOne);
  fastify.get('/auth', userController.auth);
  fastify.post('/registration', userController.createUser);
  fastify.post('/login', userController.login);
  fastify.put('/:id', userController.update);
  fastify.delete('/:id', userController.delete);
};

export default user;
