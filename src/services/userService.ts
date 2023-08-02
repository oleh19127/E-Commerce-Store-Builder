import { AppDataSource } from "../db/data-source";
import { User } from "../db/entity/User";
import { Role } from "../db/entity/Role";

class UserService {
  async getAllUsers() {
    const userRepository = AppDataSource.getRepository(User);
    return await userRepository.findAndCount();
  }

  async createUser(email: string, password: string) {
    const userRepository = AppDataSource.getRepository(User);
    const roleRepository = AppDataSource.getRepository(Role);
    const user = new User();
    const role = new Role();
    user.password = password;
    user.email = email;
    await userRepository.save(user);
    role.userId = user.id;
    await roleRepository.save(role);
    return user;
  }

  async login(email: string, password: string) {
    const userRepository = AppDataSource.getRepository(User);
    return await userRepository.findOneBy({ email, password });
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
}

export const userService = new UserService();
