import { FastifyReply, FastifyRequest } from "fastify";
import { productDescriptionService } from "../services/productDescriptionService";
import { IProductDescription } from "../interfaces/IProductDescription";

class ProductDescriptionController {
  async createProductDescription(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { productId } = request.params as IProductDescription;
      const { text } = request.body as IProductDescription;
      const result = await productDescriptionService.createProductDescription(
        productId,
        text,
      );
      return reply.send(result);
    } catch (e) {
      return reply.send(e);
    }
  }

  async getAllProductDescription(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { productId } = request.params as IProductDescription;
      const result =
        await productDescriptionService.getAllProductDescription(productId);
      return reply.send(result);
    } catch (e) {
      return reply.send(e);
    }
  }
  async updateProductDescription(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.params as IProductDescription;
      const { text } = request.body as IProductDescription;
      const result = await productDescriptionService.updateProductDescription(
        id,
        text,
      );
      return reply.send(result);
    } catch (e) {
      return reply.send(e);
    }
  }
  async deleteProductDescription(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.params as IProductDescription;
      const result =
        await productDescriptionService.deleteProductDescription(id);
      return reply.send(result);
    } catch (e) {
      return reply.send(e);
    }
  }
}

export const productDescriptionController = new ProductDescriptionController();
