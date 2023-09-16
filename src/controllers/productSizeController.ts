import { FastifyReply, FastifyRequest } from "fastify";
import { IProductSize } from "../interfaces/IProductSize";
import { productSizeService } from "../services/productSizeService";

class ProductSizeController {
  async createSize(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { productId } = request.params as IProductSize;
      const { sizeName } = request.body as IProductSize;
      const result = await productSizeService.createSize(productId, sizeName);
      return reply.send(result);
    } catch (e) {
      return reply.send(e);
    }
  }

  async getAllProductSizes(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { productId } = request.params as IProductSize;
      const result = await productSizeService.getAllProductSizes(productId);
      return reply.send(result);
    } catch (e) {
      return reply.send(e);
    }
  }

  async updateProductSize(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { productId } = request.params as IProductSize;
      const { sizeName } = request.body as IProductSize;
      const result = await productSizeService.updateProductSize(
        productId,
        sizeName,
      );
      return reply.send(result);
    } catch (e) {
      return reply.send(e);
    }
  }

  async deleteProductSize(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { productId } = request.params as IProductSize;
      const result = await productSizeService.deleteProductSize(productId);
      return reply.send(result);
    } catch (e) {
      return reply.send(e);
    }
  }

  async getOneProductSize(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.params as IProductSize;
      const result = await productSizeService.getOneProductSize(id);
      return reply.send(result);
    } catch (e) {
      return reply.send(e);
    }
  }
}

export const productSizeController = new ProductSizeController();
