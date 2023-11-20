import { FastifyPluginAsync } from 'fastify';
import { roleController } from '../../controllers/roleController';
import { createRoleSchema } from '../../swagger-schemas/role/createRoleSchema';
import { getOneRoleSchema } from '../../swagger-schemas/role/getOneRoleSchema';
import { getAllRolesSchema } from '../../swagger-schemas/role/getAllRolesSchema';
import { deleteRoleSchema } from '../../swagger-schemas/role/deleteRoleSchema';
import { updateRoleSchema } from '../../swagger-schemas/role/updateRoleSchema';
import { getAllUserRolesSchema } from '../../swagger-schemas/role/getAllUserRolesSchema';

const role: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.post('/', createRoleSchema, roleController.createRole);
  fastify.get('/get-one/:roleId', getOneRoleSchema, roleController.getOneRole);
  fastify.get('/', getAllRolesSchema, roleController.getAllRoles);
  fastify.delete('/:roleId', deleteRoleSchema, roleController.deleteRole);
  fastify.put('/:roleId', updateRoleSchema, roleController.updateRole);
  fastify.get(
    '/:userId',
    getAllUserRolesSchema,
    roleController.getAllUserRoles,
  );
};

export default role;
