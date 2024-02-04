import { test } from 'tap';
import { build } from '../../helper';
import { statusCodes } from '../../../src/static-helpers/status-codes';
import { userService } from '../../../src/services/userService';
import { AppDataSource } from '../../../src/db/data-source';
import { User } from '../../../src/db/entity/User';

test('Get all user roles route', async (t) => {
  const app = await build(t);
  const userRepository = AppDataSource.getRepository(User);
  await userService.createUser('getAllUserRoles@gmail.com', 'password');
  const foundedUser = await userRepository.findOneBy({
    email: 'getAllUserRoles@gmail.com',
  });
  if (foundedUser === null) {
    return 'User do not found';
  }
  const res = await app.inject({
    url: `/role/${foundedUser.userId}`,
    method: 'GET',
  });
  t.equal(
    res.statusCode,
    statusCodes.OK_200,
    'Get all user roles operation should return status 200',
  );
  t.after(async () => {
    await userService.delete(foundedUser.userId);
  });
});
