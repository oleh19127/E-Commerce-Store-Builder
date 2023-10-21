import { FastifyPluginAsync } from 'fastify';
import { roleController } from '../../controllers/roleController';

const role: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.post('/:userId', roleController.createRole);
  fastify.get('/:userId', roleController.getAllUserRoles);
  fastify.delete('/', roleController.deleteRole);
  fastify.get('/', roleController.getAllRoles);
  fastify.get('/get/one/:id', roleController.getOneRole);
  fastify.put('/:id', roleController.updateRole);
};

export default role;
