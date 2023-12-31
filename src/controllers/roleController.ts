import { FastifyReply, FastifyRequest } from 'fastify';
import { IRole } from '../interfaces/IRole';
import { roleService } from '../services/roleService';
import { statusCodes } from '../static-helpers/status-codes';

class RoleController {
  async getAllRoles(request: FastifyRequest, reply: FastifyReply) {
    try {
      const result = await roleService.getAllRoles();
      return reply.status(statusCodes.OK_200).send(result);
    } catch (e) {
      return reply.send(e);
    }
  }
  async createRole(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { roleName } = request.body as IRole;
      const result = await roleService.createRole(roleName);
      return reply.status(statusCodes.CREATED_201).send(result);
    } catch (e) {
      return reply.send(e);
    }
  }

  async getAllUserRoles(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { userId } = request.params as IRole;
      const result = await roleService.getAllUserRoles(userId);
      return reply.status(statusCodes.OK_200).send(result);
    } catch (e) {
      return reply.send(e);
    }
  }

  async deleteRole(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { roleId } = request.params as IRole;
      const result = await roleService.deleteRole(roleId);
      return reply.status(statusCodes.OK_200).send(result);
    } catch (e) {
      return reply.send(e);
    }
  }

  async getOneRole(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { roleId } = request.params as IRole;
      const result = await roleService.getOneRole(roleId);
      return reply.status(statusCodes.OK_200).send(result);
    } catch (e) {
      return reply.send(e);
    }
  }
  async updateRole(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { roleId } = request.params as IRole;
      const { roleName } = request.body as IRole;
      const result = await roleService.updateRole(roleName, roleId);
      return reply.status(statusCodes.OK_200).send(result);
    } catch (e) {
      return reply.send(e);
    }
  }
}

export const roleController = new RoleController();
