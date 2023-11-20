import { FastifyReply, FastifyRequest } from 'fastify';
import { userService } from '../services/userService';
import { IUser } from '../interfaces/IUser';
import { statusCodes } from '../static-helpers/status-codes';
import { IRole } from '../interfaces/IRole';

class UserController {
  async auth(request: FastifyRequest, reply: FastifyReply) {
    try {
      const token = request.headers.authorization?.split(' ')[1];
      if (token === undefined) {
        return reply.send('Token Undefined');
      }
      const result = await userService.auth(token);
      return reply.status(statusCodes.OK_200).send({ result });
    } catch (e) {
      return reply.send(e);
    }
  }
  async getAllUsers(request: FastifyRequest, reply: FastifyReply) {
    try {
      const allUsers = await userService.getAllUsers();
      return reply.status(statusCodes.OK_200).send(allUsers);
    } catch (e) {
      return reply.send(e);
    }
  }

  async getOne(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { userId } = request.params as IUser;
      const result = await userService.getOne(userId);
      return reply.status(statusCodes.OK_200).send(result);
    } catch (e) {
      return reply.send(e);
    }
  }

  async createUser(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { email, password } = request.body as IUser;
      const createdUser = await userService.createUser(email, password);
      return reply.status(statusCodes.CREATED_201).send({ createdUser });
    } catch (e) {
      return reply.send(e);
    }
  }

  async login(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { email, password } = request.body as IUser;
      const result = await userService.login(email, password);
      if (result === null) {
        return reply.send({
          message: 'User with this email or password dont exist!!!',
        });
      }
      return reply.status(statusCodes.OK_200).send({ result });
    } catch (e) {
      return reply.send(e);
    }
  }
  async update(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { email, password } = request.body as IUser;
      const { userId } = request.params as IUser;
      const result = await userService.update(email, password, userId);
      return reply.status(statusCodes.OK_200).send(result);
    } catch (e) {
      return reply.send(e);
    }
  }
  async delete(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { userId } = request.params as IUser;
      const result = await userService.delete(userId);
      return reply.status(statusCodes.OK_200).send(result);
    } catch (e) {
      return reply.send(e);
    }
  }

  async addRole(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { userId } = request.params as IUser;
      const { roleId } = request.body as IRole;
      const result = await userService.addRole(userId, roleId);
      return reply.status(statusCodes.OK_200).send(result);
    } catch (e) {
      return reply.send(e);
    }
  }

  async deleteRole(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { userId } = request.params as IUser;
      const { roleName } = request.body as IRole;
      const result = await userService.deleteRole(userId, roleName);
      return reply.status(statusCodes.OK_200).send(result);
    } catch (e) {
      return reply.send(e);
    }
  }
}

export const userController = new UserController();
