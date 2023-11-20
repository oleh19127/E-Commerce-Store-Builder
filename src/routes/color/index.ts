import { FastifyPluginAsync } from 'fastify';
import { colorController } from '../../controllers/ColorController';
import { createColorSchema } from '../../swagger-schemas/color/createColorSchema';
import { getAllColorsSchema } from '../../swagger-schemas/color/getAllColorsSchema';
import { updateColorSchema } from '../../swagger-schemas/color/updateColorSchema';
import { deleteColorSchema } from '../../swagger-schemas/color/deleteColorSchema';

const productColor: FastifyPluginAsync = async (
  fastify,
  opts,
): Promise<void> => {
  fastify.post('/', createColorSchema, colorController.createColor);
  fastify.get('/', getAllColorsSchema, colorController.getAllColors);
  fastify.put('/:colorId', updateColorSchema, colorController.updateColor);
  fastify.delete('/:colorId', deleteColorSchema, colorController.deleteColor);
};

export default productColor;
