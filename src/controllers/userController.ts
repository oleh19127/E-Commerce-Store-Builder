import { FastifyReply, FastifyRequest } from 'fastify';
import { userService } from '../services/userService';
import { IUser } from '../interfaces/IUser';

class UserController {
  async auth(request: FastifyRequest, reply: FastifyReply) {
    try {
      const token = request.headers.authorization?.split(' ')[1];
      if (token === undefined) {
        return reply.send('Token Undefined');
      }
      const result = await userService.auth(token);
      return reply.send({ result });
    } catch (e) {
      return reply.send(e);
    }
  }
  async getAllUsers(request: FastifyRequest, reply: FastifyReply) {
    try {
      const allUsers = await userService.getAllUsers();
      return reply.send(allUsers);
    } catch (e) {
      return reply.send(e);
    }
  }

  async getOne(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.params as IUser;
      const result = await userService.getOne(id);
      return reply.send(result);
    } catch (e) {
      return reply.send(e);
    }
  }

  async createUser(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { email, password } = request.body as IUser;
      const createdUser = await userService.createUser(email, password);
      return reply.send({ createdUser });
    } catch (e) {
      return reply.send(e);
    }
  }

  async login(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { email, password } = request.body as IUser;
      const result = await userService.login(email, password);
      if (result === null) {
        return reply.send('User with this email or password dont exist!!!');
      }
      return reply.send({ result });
    } catch (e) {
      return reply.send(e);
    }
  }
  async update(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { email, password } = request.body as IUser;
      const { id } = request.params as IUser;
      const result = await userService.update(email, password, id);
      return reply.send(result);
    } catch (e) {
      return reply.send(e);
    }
  }
  async delete(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.params as IUser;
      const result = await userService.delete(id);
      return reply.send(result);
    } catch (e) {
      return reply.send(e);
    }
  }
}

export const userController = new UserController();
