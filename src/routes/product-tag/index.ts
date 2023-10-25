import { FastifyPluginAsync } from 'fastify';
import { productTagController } from '../../controllers/productTagController';

const productTag: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.post('/:productId', productTagController.createProductTag);
  fastify.get('/:productId', productTagController.getAllProductTags);
  fastify.put('/:id', productTagController.updateProductTag);
  fastify.delete('/:id', productTagController.deleteProductTag);
};

export default productTag;
