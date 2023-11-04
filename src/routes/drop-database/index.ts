import { FastifyPluginAsync } from 'fastify';
import { AppDataSource } from '../../db/data-source';

const product: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get('/', async function (request, reply) {
    await AppDataSource.synchronize(true);
    return reply.send({ message: 'Database dropped successfully' });
  });
};

export default product;
