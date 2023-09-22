import { FastifyReply, FastifyRequest } from "fastify";
import { IProductWeight } from "../interfaces/IProductWeight";
import { productWeightService } from "../services/productWeightService";

class ProductWeightController {
  async createWeight(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { productId } = request.params as IProductWeight;
      const { kg, lb } = request.body as IProductWeight;
      const result = await productWeightService.createWeight(productId, kg, lb);
      return reply.send(result);
    } catch (e) {
      return reply.send(e);
    }
  }

  async getAllProductWeights(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { productId } = request.params as IProductWeight;
      const result = await productWeightService.getAllProductWeights(productId);
      return reply.send(result);
    } catch (e) {
      return reply.send(e);
    }
  }

  async updateWeight(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.params as IProductWeight;
      const { kg, lb } = request.body as IProductWeight;
      const result = await productWeightService.updateWeight(id, kg, lb);
      return reply.send(result);
    } catch (e) {
      return reply.send(e);
    }
  }

  async deleteWeight(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.params as IProductWeight;
      const result = await productWeightService.deleteWeight(id);
      return reply.send(result);
    } catch (e) {
      return reply.send(e);
    }
  }
}

export const productWeightController = new ProductWeightController();
