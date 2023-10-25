// import { FastifyReply, FastifyRequest } from 'fastify';
// import { AppDataSource } from '../db/data-source';
// import { Role } from '../db/entity/Role';
// import { IRole } from '../interfaces/IRole';
// import { User } from '../db/entity/User';

// export async function adminMiddleware(
//   request: FastifyRequest,
//   reply: FastifyReply,
// ) {
//   const { userId } = request.params as IRole;
//   const roleRepository = AppDataSource.getRepository(Role);
//   const userRepository = AppDataSource.getRepository(User);
//   const foundedUser = await userRepository.findOneBy({ id: userId });
//   if (foundedUser === null) {
//     return 'User not found';
//   }
//   const roles = await roleRepository.find({ where: { userId } });
//   const isAdmin = roles.some((role) => role.roleName === 'ADMIN');
//   if (!isAdmin) {
//     return reply.send('You is not admin!!!');
//   }
// }
