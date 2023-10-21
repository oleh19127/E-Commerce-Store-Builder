import { FastifyReply, FastifyRequest } from 'fastify';
import { IProductColor } from '../interfaces/IProductColor';
import { productColorService } from '../services/productColorService';

class ProductColorController {
  async createColor(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { productId } = request.params as IProductColor;
      const { colorValue } = request.body as IProductColor;
      const result = await productColorService.createColor(
        productId,
        colorValue,
      );
      return reply.send(result);
    } catch (e) {
      return reply.send(e);
    }
  }

  async getAllProductColors(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { productId } = request.params as IProductColor;
      const result = await productColorService.getAllProductColors(productId);
      return reply.send(result);
    } catch (e) {
      return reply.send(e);
    }
  }

  async updateColor(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.params as IProductColor;
      const { colorValue } = request.body as IProductColor;
      const result = await productColorService.updateColor(id, colorValue);
      return reply.send(result);
    } catch (e) {
      return reply.send(e);
    }
  }

  async deleteColor(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.params as IProductColor;
      const result = await productColorService.deleteColor(id);
      return reply.send(result);
    } catch (e) {
      return reply.send(e);
    }
  }
}

export const productColorController = new ProductColorController();
