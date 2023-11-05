import { test } from 'tap';
import { build } from '../../helper';
import { statusCodes } from '../../../src/static-helpers/status-codes';
import { userService } from '../../../src/services/userService';
import { AppDataSource } from '../../../src/db/data-source';
import { User } from '../../../src/db/entity/User';

test('Update user route', async (t) => {
  const app = await build(t);
  const userRepository = AppDataSource.getRepository(User);
  await userService.createUser('updateUser@gmail.com', 'pass');
  const user = await userRepository.findOneBy({
    email: 'updateUser@gmail.com',
  });
  if (user === null) {
    return 'user not found';
  }
  const res = await app.inject({
    url: `/user/${user.id}`,
    method: 'PUT',
    payload: { email: 'updatedUser@gmail.com' },
  });
  t.equal(
    res.statusCode,
    statusCodes.OK_200,
    'Update user operation should return status 200',
  );
  const resPayload = JSON.parse(res.payload);
  t.same(resPayload.email, 'updatedUser@gmail.com');

  t.after(async () => {
    await userService.delete(user.id);
  });
});
