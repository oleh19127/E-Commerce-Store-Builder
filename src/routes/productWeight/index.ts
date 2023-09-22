import { FastifyPluginAsync } from "fastify";
import { productWeightController } from "../../controllers/productWeightController";

const productWeight: FastifyPluginAsync = async (
  fastify,
  opts,
): Promise<void> => {
  fastify.post("/:productId", productWeightController.createWeight);
  fastify.get("/:productId", productWeightController.getAllProductWeights);
  fastify.put("/:id", productWeightController.updateWeight);
  fastify.delete("/:id", productWeightController.deleteWeight);
};

export default productWeight;
