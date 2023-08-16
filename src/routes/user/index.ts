import { FastifyPluginAsync } from "fastify";
import { userController } from "../../controllers/userController";
import { adminMiddleware } from "../../middlewares/adminMiddleware";

const user: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get(
    "/all/:userId",
    { preHandler: adminMiddleware },
    userController.getAllUsers,
  );
  fastify.post("/registration", userController.createUser);
  fastify.post("/login", userController.login);
  fastify.put("/:id", userController.update);
  fastify.delete("/:id", userController.delete);
};

export default user;
