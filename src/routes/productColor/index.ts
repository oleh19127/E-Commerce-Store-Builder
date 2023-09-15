import { FastifyPluginAsync } from "fastify";
import { productColorController } from "../../controllers/productColorController";

const productColor: FastifyPluginAsync = async (
  fastify,
  opts,
): Promise<void> => {
  fastify.post("/:productId", productColorController.createColor);
  fastify.get("/:productId", productColorController.getAllProductColors);
  fastify.put("/:id", productColorController.updateColor);
  fastify.delete("/:id", productColorController.deleteColor);
};

export default productColor;
