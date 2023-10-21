import { FastifyPluginAsync } from 'fastify';
import { productDescriptionController } from '../../controllers/productDescriptionController';

const productDescription: FastifyPluginAsync = async (
  fastify,
  opts,
): Promise<void> => {
  fastify.post(
    '/:productId',
    productDescriptionController.createProductDescription,
  );
  fastify.get(
    '/:productId',
    productDescriptionController.getAllProductDescription,
  );
  fastify.put('/:id', productDescriptionController.updateProductDescription);
  fastify.delete('/:id', productDescriptionController.deleteProductDescription);
};

export default productDescription;
