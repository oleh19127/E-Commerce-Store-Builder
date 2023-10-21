import { AppDataSource } from '../db/data-source';
import { User } from '../db/entity/User';
import { Role } from '../db/entity/Role';

class RoleService {
  private roleRepository = AppDataSource.getRepository(Role);
  private userRepository = AppDataSource.getRepository(User);
  async getAllRoles() {
    return await this.roleRepository.findAndCount();
  }
  async createRole(userId: number, name: string) {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (user === null) {
      return 'User not found';
    }
    const role = new Role();
    role.name = name;
    role.userId = userId;
    await this.roleRepository.save(role);
    return role;
  }

  async getAllUserRoles(userId: number) {
    return await this.roleRepository.findAndCountBy({ userId });
  }

  async deleteRole(id: number) {
    const role = await this.roleRepository.findOneBy({ id });
    if (role === null) {
      return 'Role not found';
    }
    if (role.name === 'USER') {
      return "Role 'USER' cant delete!!!";
    }
    const destroyedRole = await this.roleRepository.delete(id);
    if (destroyedRole.affected === 1) {
      return 'Role successfully deleted!!!';
    }
    if (destroyedRole.affected === 0) {
      return 'There is no such role to delete it!!!';
    }
  }
  async getOneRole(id: number) {
    const role = await this.roleRepository.findOneBy({ id });
    if (role === null) {
      return 'Role not found';
    }
    return role;
  }

  async updateRole(name: string, id: number) {
    const role = await this.roleRepository.findOneBy({ id });
    if (role === null) {
      return 'Role not found';
    }
    if (role.name === 'USER') {
      return "Role 'USER' cant update!!!";
    }
    if (role && name) {
      role.name = name;
      await this.roleRepository.save(role);
    }
    return role;
  }
}

export const roleService = new RoleService();
