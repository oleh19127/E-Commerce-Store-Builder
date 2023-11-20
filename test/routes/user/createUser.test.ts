import { test } from 'tap';
import { build } from '../../helper';
import { statusCodes } from '../../../src/static-helpers/status-codes';
import { userService } from '../../../src/services/userService';
import { AppDataSource } from '../../../src/db/data-source';
import { User } from '../../../src/db/entity/User';

test('Create user route', async (t) => {
  const app = await build(t);
  const userRepository = AppDataSource.getRepository(User);
  const res = await app.inject({
    url: '/user/registration',
    method: 'POST',
    payload: { email: 'createUserRoute@gmail.com', password: 'pass' },
  });
  t.equal(
    res.statusCode,
    statusCodes.CREATED_201,
    'Create user operation should return status 201',
  );
  const user = await userRepository.findOneBy({
    email: 'createUserRoute@gmail.com',
  });
  if (user === null) {
    return 'User not found';
  }
  t.same(user.email, 'createUserRoute@gmail.com');

  t.after(async () => {
    await userService.delete(user.userId);
  });
});
