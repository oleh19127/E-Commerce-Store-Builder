import { FastifyReply, FastifyRequest } from 'fastify';
import { productStyleService } from '../services/productStyleService';
import { IProductStyle } from '../interfaces/IProductStyle';

class ProductStyleController {
  async createProductStyle(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { productId } = request.params as IProductStyle;
      const { styleName } = request.body as IProductStyle;
      const result = await productStyleService.createProductStyle(
        productId,
        styleName,
      );
      return reply.send(result);
    } catch (e) {
      return reply.send(e);
    }
  }
  async getAllProductStyle(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { productId } = request.params as IProductStyle;
      const result = await productStyleService.getAllProductStyle(productId);
      return reply.send(result);
    } catch (e) {
      return reply.send(e);
    }
  }
  async updateProductStyle(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.params as IProductStyle;
      const { styleName } = request.body as IProductStyle;
      const result = await productStyleService.updateProductStyle(
        id,
        styleName,
      );
      return reply.send(result);
    } catch (e) {
      return reply.send(e);
    }
  }
  async deleteProductStyle(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.params as IProductStyle;
      const result = await productStyleService.deleteProductStyle(id);
      return reply.send(result);
    } catch (e) {
      return reply.send(e);
    }
  }
}

export const productStyleController = new ProductStyleController();
