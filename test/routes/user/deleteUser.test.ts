import { test } from 'tap';
import { build } from '../../helper';
import { statusCodes } from '../../../src/static-helpers/status-codes';
import { AppDataSource } from '../../../src/db/data-source';
import { User } from '../../../src/db/entity/User';
import { userService } from '../../../src/services/userService';

test('Delete user route', async (t) => {
  const app = await build(t);
  const userRepository = AppDataSource.getRepository(User);
  await userService.createUser('deleteUser@gmail.com', 'pass');
  const user = await userRepository.findOneBy({
    email: 'deleteUser@gmail.com',
  });
  if (user === null) {
    return 'User not found';
  }
  const res = await app.inject({
    url: `/user/${user.id}`,
    method: 'DELETE',
  });
  t.equal(
    res.statusCode,
    statusCodes.OK_200,
    'Delete role operation should return status 200',
  );
});
