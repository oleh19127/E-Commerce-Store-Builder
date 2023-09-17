import { FastifyReply, FastifyRequest } from "fastify";
import { productTagService } from "../services/productTagService";
import { IProductTag } from "../interfaces/IProductTag";

class ProductTagController {
  async createProductTag(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { productId } = request.params as IProductTag;
      const { tagName } = request.body as IProductTag;
      const result = await productTagService.createProductTag(
        productId,
        tagName,
      );
      return reply.send(result);
    } catch (e) {
      return reply.send(e);
    }
  }

  async getAllProductTags(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { productId } = request.params as IProductTag;
      const result = await productTagService.getAllProductTags(productId);
      return reply.send(result);
    } catch (e) {
      return reply.send(e);
    }
  }

  async updateProductTag(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.params as IProductTag;
      const { tagName } = request.body as IProductTag;
      const result = await productTagService.updateProductTag(id, tagName);
      return reply.send(result);
    } catch (e) {
      return reply.send(e);
    }
  }

  async deleteProductTag(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.params as IProductTag;
      const result = await productTagService.deleteProductTag(id);
      return reply.send(result);
    } catch (e) {
      return reply.send(e);
    }
  }
}

export const productTagController = new ProductTagController();
