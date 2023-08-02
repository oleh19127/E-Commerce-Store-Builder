import { AppDataSource } from "../db/data-source";
import { User } from "../db/entity/User";
import { Role } from "../db/entity/Role";

class RoleService {
  async getAllRoles() {
    const roleRepository = AppDataSource.getRepository(Role);
    return await roleRepository.findAndCount();
  }
  async createRole(userId: number, name: string) {
    const userRepository = AppDataSource.getRepository(User);
    const roleRepository = AppDataSource.getRepository(Role);
    const user = await userRepository.findOneBy({ id: userId });
    if (user === null) {
      return "User not found";
    }
    const role = new Role();
    role.name = name;
    role.userId = userId;
    await roleRepository.save(role);
    return role;
  }

  async getAllUserRoles(userId: number) {
    const roleRepository = AppDataSource.getRepository(Role);
    return await roleRepository.findAndCountBy({ userId });
  }

  async deleteRole(id: number) {
    const roleRepository = AppDataSource.getRepository(Role);
    const role = await roleRepository.findOneBy({ id });
    if (role?.name === "USER") {
      return "Role 'USER' cant delete!!!";
    }
    const destroyedRole = await roleRepository.delete(id);
    if (destroyedRole.affected === 1) {
      return "Role successfully deleted!!!";
    }
    if (destroyedRole.affected === 0) {
      return "There is no such role to delete it!!!";
    }
  }
  async getOneRole(id: number) {
    const roleRepository = AppDataSource.getRepository(Role);
    return await roleRepository.findOneBy({ id });
  }

  async updateRole(name: string, id: number) {
    const roleRepository = AppDataSource.getRepository(Role);
    const role = await roleRepository.findOneBy({ id });
    if (role?.name === "USER") {
      return "Role 'USER' cant update!!!";
    }
    if (role && name) {
      role.name = name;
      await roleRepository.save(role);
    }
    return role;
  }
}

export const roleService = new RoleService();
