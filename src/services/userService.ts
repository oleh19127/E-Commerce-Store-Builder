import { AppDataSource } from '../db/data-source';
import { User } from '../db/entity/User';
import { Role } from '../db/entity/Role';
import { hash, compare } from 'bcrypt';
import { sign, verify } from 'jsonwebtoken';
class UserService {
  private userRepository = AppDataSource.getRepository(User);
  private roleRepository = AppDataSource.getRepository(Role);
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
    return sign(payload, 'some secret key', { expiresIn: '2h' });
  }
  async getAllUsers() {
    return await this.userRepository.find({ relations: ['roles'] });
  }

  async getOne(userId: number) {
    const user = await this.userRepository.findOne({
      where: { userId },
      relations: ['roles'],
    });
    if (user === null) {
      return 'User not found';
    }
    return user;
  }

  async createUser(email: string, password: string) {
    const hashPassword = hash(password, 1);
    const user = this.userRepository.create({
      password: await hashPassword,
      email,
    });
    await this.userRepository.insert(user);
    const createdUser = await this.userRepository.findOne({
      where: { userId: user.userId },
      relations: ['roles'],
    });
    if (createdUser === null) {
      return 'User not found';
    }
    const defaultRole = await this.roleRepository.findOneBy({
      roleName: 'USER',
    });
    if (defaultRole === null) {
      return 'Role not found';
    }
    createdUser.roles.push(defaultRole);
    // await this.userRepository.save(createdUser);
    return await this.generateAccessToken(
      user.userId,
      user.email,
      user.roles,
      user.password,
    );
  }

  async login(email: string, password: string) {
    const candidate = await this.userRepository.findOne({
      relations: ['roles'],
      where: { email },
    });
    if (candidate === null) {
      return { message: 'User not found' };
    }
    const validPassword = await compare(password, candidate.password);
    if (!validPassword) {
      return { message: 'Password wrong' };
    }
    return await this.generateAccessToken(
      candidate.userId,
      candidate.email,
      candidate.roles,
      candidate.password,
    );
  }

  async update(email: string, password: string, userId: number) {
    const foundedUser = await this.userRepository.findOneBy({ userId });
    if (foundedUser === null) {
      return 'User not found';
    }
    await this.userRepository.update(
      {
        email: foundedUser.email,
        password: foundedUser.password,
      },
      {
        email,
        password,
      },
    );
    return foundedUser;
  }

  async delete(userId: number) {
    const destroyedUser = await this.userRepository.delete(userId);
    if (destroyedUser.affected === 1) {
      return { message: 'User successfully deleted!!!' };
    }
    if (destroyedUser.affected === 0) {
      return { message: 'There is no such user to delete it!!!' };
    }
  }

  async auth(token: string) {
    if (!token) {
      return { message: 'User is not authorized' };
    }
    return verify(token, 'some secret key');
  }

  async addRole(userId: number, roleId: number) {
    const user = await this.userRepository.findOne({
      where: { userId },
      relations: ['roles'],
    });
    if (user === null) {
      return { message: 'User not found' };
    }
    const foundRole = await this.roleRepository.findOneBy({ roleId });
    if (foundRole === null) {
      return { message: 'Role not found' };
    }
    user.roles.push(foundRole);
    await this.userRepository.save(user);
    return user;
  }

  async deleteRole(userId: number, roleName: string) {
    const user = await this.userRepository.findOne({
      where: { userId },
      relations: ['roles'],
    });
    if (user === null) {
      return { message: 'User not found' };
    }
    user.roles = user.roles.filter((role) => {
      return role.roleName !== roleName;
    });
    await this.userRepository.save(user);
    return user;
  }
}

export const userService = new UserService();
