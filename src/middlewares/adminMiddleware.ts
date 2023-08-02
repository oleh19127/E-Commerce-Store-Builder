import { FastifyReply, FastifyRequest } from "fastify";
import { AppDataSource } from "../db/data-source";
import { Role } from "../db/entity/Role";
import { IRole } from "../interfaces/IRole";

export async function adminMiddleware(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { userId } = request.params as IRole;
  const roleRepository = AppDataSource.getRepository(Role);
  const roles = await roleRepository.find({ where: { userId } });
  const isAdmin = roles.some((role) => role.name === "ADMIN");
  if (!isAdmin) {
    return reply.send("Unauthorized");
  }
}
