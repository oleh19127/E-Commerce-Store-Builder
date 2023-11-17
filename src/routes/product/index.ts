import { FastifyPluginAsync } from 'fastify';
import { productController } from '../../controllers/productController';

const product: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.post('/', productController.createProduct);
  fastify.get('/', productController.getAllProducts);
  fastify.get('/:productId', productController.getOneProduct);
  fastify.put('/:productId', productController.updateProduct);
  fastify.delete('/:productId', productController.deleteProduct);
};

export default product;
