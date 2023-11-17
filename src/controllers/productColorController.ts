import { FastifyReply, FastifyRequest } from 'fastify';
import { IProductColor } from '../interfaces/IProductColor';
import { productColorService } from '../services/productColorService';
import { statusCodes } from '../static-helpers/status-codes';

class ProductColorController {
  async createColor(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { colorValue } = request.body as IProductColor;
      const result = await productColorService.createColor(colorValue);
      return reply.status(statusCodes.CREATED_201).send(result);
    } catch (e) {
      return reply.send(e);
    }
  }

  async getAllColors(_request: FastifyRequest, reply: FastifyReply) {
    try {
      const result = await productColorService.getAllColors();
      return reply.status(statusCodes.OK_200).send(result);
    } catch (e) {
      return reply.send(e);
    }
  }

  async updateColor(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.params as IProductColor;
      const { colorValue } = request.body as IProductColor;
      const result = await productColorService.updateColor(id, colorValue);
      return reply.status(statusCodes.OK_200).send(result);
    } catch (e) {
      return reply.send(e);
    }
  }

  async deleteColor(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.params as IProductColor;
      const result = await productColorService.deleteColor(id);
      return reply.status(statusCodes.OK_200).send(result);
    } catch (e) {
      return reply.send(e);
    }
  }
}

export const productColorController = new ProductColorController();
