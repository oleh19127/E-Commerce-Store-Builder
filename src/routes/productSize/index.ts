import { FastifyPluginAsync } from "fastify";
import { productSizeController } from "../../controllers/productSizeController";

const productSize: FastifyPluginAsync = async (
  fastify,
  opts,
): Promise<void> => {
  fastify.post("/:productId", productSizeController.createSize);
  fastify.get("/:productId", productSizeController.getAllProductSizes);
  fastify.put("/:productId", productSizeController.updateProductSize);
  fastify.delete("/:productId", productSizeController.deleteProductSize);
};

export default productSize;
