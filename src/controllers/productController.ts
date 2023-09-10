import { FastifyReply, FastifyRequest } from "fastify";
import { IProduct } from "../interfaces/IProduct";
import { productService } from "../services/productService";

class ProductController {
  async createProduct(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { sku, price, subtitle, title } = request.body as IProduct;
      const { userId } = request.params as IProduct;
      const result = await productService.createProduct(
        sku,
        price,
        subtitle,
        title,
        userId,
      );
      return reply.send(result);
    } catch (e) {
      return reply.send(e);
    }
  }

  async getAll(request: FastifyRequest, reply: FastifyReply) {
    try {
      const result = await productService.getAll();
      return reply.send(result);
    } catch (e) {
      return reply.send(e);
    }
  }

  async getOne(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { productId } = request.params as IProduct;
      const result = await productService.getOne(productId);
      return reply.send(result);
    } catch (e) {
      return reply.send(e);
    }
  }
  async update(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { productId } = request.params as IProduct;
      const { sku, price, subtitle, title } = request.body as IProduct;
      const result = await productService.update(
        productId,
        sku,
        price,
        subtitle,
        title,
      );
      return reply.send(result);
    } catch (e) {
      return reply.send(e);
    }
  }

  async delete(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { productId } = request.params as IProduct;
      const result = await productService.delete(productId);
      return reply.send(result);
    } catch (e) {
      return reply.send(e);
    }
  }
}

export const productController = new ProductController();
