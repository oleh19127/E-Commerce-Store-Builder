import { test } from 'tap';
import { build } from '../../helper';
import { statusCodes } from '../../../src/static-helpers/status-codes';
import { userService } from '../../../src/services/userService';
import { AppDataSource } from '../../../src/db/data-source';
import { User } from '../../../src/db/entity/User';

test('Get one user route', async (t) => {
  const app = await build(t);
  const userRepository = AppDataSource.getRepository(User);
  await userService.createUser('getOneUserRoute@gmail.com', 'some password');
  const user = await userRepository.findOneBy({
    email: 'getOneUserRoute@gmail.com',
  });
  if (user === null) {
    return 'User not found';
  }
  const res = await app.inject({
    url: `/user/one/${user.userId}`,
    method: 'GET',
  });
  const resPayload = JSON.parse(res.payload);
  t.same(resPayload.email, 'getOneUserRoute@gmail.com');
  t.equal(
    res.statusCode,
    statusCodes.OK_200,
    'Get one user operation should return status 200',
  );
  t.after(async () => {
    await userService.delete(user.userId);
  });
});
