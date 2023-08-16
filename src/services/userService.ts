import { AppDataSource } from "../db/data-source";
import { User } from "../db/entity/User";
import { Role } from "../db/entity/Role";
import { hash, compare } from "bcrypt";
import { sign, verify } from "jsonwebtoken";
class UserService {
  private async generateAccessToken(
    id: number,
    email: string,
    roles: Role[],
    password: string,
  ) {
    const payload = {
      id,
      email,
      roles,
      password,
    };
    return sign(payload, "some secret key", { expiresIn: "2h" });
  }
  async getAllUsers() {
    const userRepository = AppDataSource.getRepository(User);
    return await userRepository.findAndCount({ relations: ["roles"] });
  }

  async createUser(email: string, password: string) {
    const userRepository = AppDataSource.getRepository(User);
    const roleRepository = AppDataSource.getRepository(Role);
    const hashPassword = hash(password, 10);
    const user = new User();
    const role = new Role();
    user.password = await hashPassword;
    user.email = email;
    await userRepository.save(user);
    role.userId = user.id;
    await roleRepository.save(role);
    user.roles = await roleRepository.findBy({ userId: user.id });
    return await this.generateAccessToken(
      user.id,
      user.email,
      user.roles,
      user.password,
    );
  }

  async login(email: string, password: string) {
    const userRepository = AppDataSource.getRepository(User);
    const candidate = await userRepository.findOne({
      relations: ["roles"],
      where: { email },
    });
    if (candidate === null) {
      return "User not found";
    }
    const validPassword = await compare(password, candidate.password);
    if (!validPassword) {
      return "Password wrong";
    }
    return await this.generateAccessToken(
      candidate.id,
      candidate.email,
      candidate.roles,
      candidate.password,
    );
  }

  async update(email: string, password: string, id: number) {
    const userRepository = AppDataSource.getRepository(User);
    const foundedUser = await userRepository.findOneBy({ id });
    if (foundedUser === null) {
      return "User not found";
    }
    foundedUser.email = email;
    foundedUser.password = password;
    await userRepository.save(foundedUser);
    return foundedUser;
  }

  async delete(id: number) {
    const userRepository = AppDataSource.getRepository(User);
    const roleRepository = AppDataSource.getRepository(Role);
    await roleRepository.delete({ userId: id });
    const destroyedUser = await userRepository.delete(id);
    if (destroyedUser.affected === 1) {
      return "User successfully deleted!!!";
    }
    if (destroyedUser.affected === 0) {
      return "There is no such user to delete it!!!";
    }
  }

  async auth(token: string) {
    if (!token) {
      return "User is not authorized";
    }
    return verify(token, "some secret key");
  }
}

export const userService = new UserService();
