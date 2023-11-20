import { FastifyReply, FastifyRequest } from 'fastify';
import { IColor } from '../interfaces/IColor';
import { statusCodes } from '../static-helpers/status-codes';
import { colorService } from '../services/colorService';

class ColorController {
  async createColor(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { colorValue } = request.body as IColor;
      const result = await colorService.createColor(colorValue);
      return reply.status(statusCodes.CREATED_201).send(result);
    } catch (e) {
      return reply.send(e);
    }
  }

  async getAllColors(_request: FastifyRequest, reply: FastifyReply) {
    try {
      const result = await colorService.getAllColors();
      return reply.status(statusCodes.OK_200).send(result);
    } catch (e) {
      return reply.send(e);
    }
  }

  async updateColor(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { colorId } = request.params as IColor;
      const { colorValue } = request.body as IColor;
      const result = await colorService.updateColor(colorId, colorValue);
      return reply.status(statusCodes.OK_200).send(result);
    } catch (e) {
      return reply.send(e);
    }
  }

  async deleteColor(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { colorId } = request.params as IColor;
      const result = await colorService.deleteColor(colorId);
      return reply.status(statusCodes.OK_200).send(result);
    } catch (e) {
      return reply.send(e);
    }
  }
}

export const colorController = new ColorController();
