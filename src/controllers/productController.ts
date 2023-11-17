import { FastifyReply, FastifyRequest } from 'fastify';
import { IProduct } from '../interfaces/IProduct';
import { productService } from '../services/productService';
import { statusCodes } from '../static-helpers/status-codes';

class ProductController {
  async createProduct(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { sku, price, subtitle, title } = request.body as IProduct;
      const result = await productService.createProduct(
        sku,
        price,
        subtitle,
        title,
      );
      return reply.status(statusCodes.CREATED_201).send(result);
    } catch (e) {
      return reply.send(e);
    }
  }

  async getAllProducts(_request: FastifyRequest, reply: FastifyReply) {
    try {
      const result = await productService.getAll();
      return reply.status(statusCodes.OK_200).send(result);
    } catch (e) {
      return reply.send(e);
    }
  }

  async getOneProduct(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.params as IProduct;
      const result = await productService.getOne(id);
      return reply.status(statusCodes.OK_200).send(result);
    } catch (e) {
      return reply.send(e);
    }
  }
  async updateProduct(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.params as IProduct;
      const { sku, price, subtitle, title } = request.body as IProduct;
      const result = await productService.update(
        id,
        sku,
        price,
        subtitle,
        title,
      );
      return reply.status(statusCodes.OK_200).send(result);
    } catch (e) {
      return reply.send(e);
    }
  }

  async deleteProduct(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.params as IProduct;
      const result = await productService.delete(id);
      return reply.status(statusCodes.OK_200).send(result);
    } catch (e) {
      return reply.send(e);
    }
  }
}

export const productController = new ProductController();
