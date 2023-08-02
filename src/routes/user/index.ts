import { FastifyPluginAsync } from "fastify";
import { userController } from "../../controllers/userController";

const user: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get("/", userController.getAllUsers);
  fastify.post("/registration", userController.createUser);
  fastify.post("/login", userController.login);
  fastify.put("/:id", userController.update);
  fastify.delete("/:id", userController.delete);
};

export default user;
