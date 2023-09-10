import { FastifyPluginAsync } from "fastify";
import { productController } from "../../controllers/productController";

const product: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.post("/:userId", productController.createProduct);
  fastify.get("/", productController.getAll);
  fastify.get("/:productId", productController.getOne);
  fastify.put("/:id", productController.update);
  fastify.delete("/:productId", productController.delete);
};

export default product;
