import { AppDataSource } from '../db/data-source';
import { User } from '../db/entity/User';
import { Role } from '../db/entity/Role';

class RoleService {
  private roleRepository = AppDataSource.getRepository(Role);
  private userRepository = AppDataSource.getRepository(User);
  async getAllRoles() {
    return await this.roleRepository.find();
  }
  async createRole(roleName: string) {
    const role = new Role();
    role.roleName = roleName;
    await this.roleRepository.save(role);
    return role;
  }

  async getAllUserRoles(userId: number) {
    const user = await this.userRepository.findOne({
      where: { userId },
      relations: ['roles'],
    });
    if (user === null) {
      return { message: 'User not found' };
    }
    return user.roles;
  }

  async deleteRole(roleId: number) {
    const role = await this.roleRepository.findOneBy({ roleId });
    if (role === null) {
      return { message: 'Role not found' };
    }
    if (role.roleName === 'USER') {
      return { message: "Role 'USER' cant delete!!!" };
    }
    const destroyedRole = await this.roleRepository.delete(roleId);
    if (destroyedRole.affected === 1) {
      return { message: 'Role successfully deleted!!!' };
    }
    return { message: 'There is no such role to delete it!!!' };
  }
  async getOneRole(roleId: number) {
    const role = await this.roleRepository.findOneBy({ roleId });
    if (role === null) {
      return { message: 'Role not found' };
    }
    return role;
  }

  async updateRole(roleName: string, roleId: number) {
    const role = await this.roleRepository.findOneBy({ roleId });
    if (role === null) {
      return { message: 'Role not found' };
    }
    if (role.roleName === 'USER') {
      return { message: "Role 'USER' cant update!!!" };
    }
    if (role && roleName) {
      role.roleName = roleName;
      await this.roleRepository.save(role);
    }
    return role;
  }
}

export const roleService = new RoleService();
