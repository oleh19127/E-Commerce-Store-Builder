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
    return await this.userRepository.findAndCount({ relations: ['roles'] });
  }

  async getOne(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    if (user === null) {
      return 'User not found';
    }
    return user;
  }

  async createUser(email: string, password: string) {
    const hashPassword = hash(password, 1);
    const user = new User();
    user.password = await hashPassword;
    user.email = email;
    await this.userRepository.save(user);
    const createdUser = await this.userRepository.findOne({
      where: { id: user.id },
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
    await this.userRepository.save(createdUser);
    return await this.generateAccessToken(
      user.id,
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
      return 'User not found';
    }
    const validPassword = await compare(password, candidate.password);
    if (!validPassword) {
      return 'Password wrong';
    }
    return await this.generateAccessToken(
      candidate.id,
      candidate.email,
      candidate.roles,
      candidate.password,
    );
  }

  async update(email: string, password: string, id: number) {
    const foundedUser = await this.userRepository.findOneBy({ id });
    if (foundedUser === null) {
      return 'User not found';
    }
    foundedUser.email = email;
    foundedUser.password = password;
    await this.userRepository.save(foundedUser);
    return foundedUser;
  }

  async delete(id: number) {
    const destroyedUser = await this.userRepository.delete(id);
    if (destroyedUser.affected === 1) {
      return 'User successfully deleted!!!';
    }
    if (destroyedUser.affected === 0) {
      return 'There is no such user to delete it!!!';
    }
  }

  async auth(token: string) {
    if (!token) {
      return 'User is not authorized';
    }
    return verify(token, 'some secret key');
  }
}

export const userService = new UserService();
