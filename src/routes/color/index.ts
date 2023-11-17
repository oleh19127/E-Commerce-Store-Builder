import { FastifyPluginAsync } from 'fastify';
import { productColorController } from '../../controllers/productColorController';
import { createColorSchema } from '../../swagger-schemas/color/createColorSchema';
import { getAllColorsSchema } from '../../swagger-schemas/color/getAllColorsSchema';
import { updateColorSchema } from '../../swagger-schemas/color/updateColorSchema';
import { deleteColorSchema } from '../../swagger-schemas/color/deleteColorSchema';

const productColor: FastifyPluginAsync = async (
  fastify,
  opts,
): Promise<void> => {
  fastify.post('/', createColorSchema, productColorController.createColor);
  fastify.get('/', getAllColorsSchema, productColorController.getAllColors);
  fastify.put('/:id', updateColorSchema, productColorController.updateColor);
  fastify.delete('/:id', deleteColorSchema, productColorController.deleteColor);
};

export default productColor;
