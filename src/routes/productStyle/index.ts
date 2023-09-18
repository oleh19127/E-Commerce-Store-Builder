import { FastifyPluginAsync } from "fastify";
import { productStyleController } from "../../controllers/productStyleController";

const productSize: FastifyPluginAsync = async (
  fastify,
  opts,
): Promise<void> => {
  fastify.post("/:productId", productStyleController.createProductStyle);
  fastify.get("/:productId", productStyleController.getAllProductStyle);
  fastify.put("/:id", productStyleController.updateProductStyle);
  fastify.delete("/:id", productStyleController.deleteProductStyle);
};

export default productSize;
