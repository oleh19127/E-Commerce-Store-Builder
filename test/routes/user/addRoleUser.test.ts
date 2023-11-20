import { test } from 'tap';
import { build } from '../../helper';
import { statusCodes } from '../../../src/static-helpers/status-codes';
import { userService } from '../../../src/services/userService';
import { AppDataSource } from '../../../src/db/data-source';
import { User } from '../../../src/db/entity/User';
import { roleService } from '../../../src/services/roleService';

test('Add role user route', async (t) => {
  const app = await build(t);
  const userRepository = AppDataSource.getRepository(User);
  await userService.createUser('makeAdminUser@gmail.com', 'pass');
  const adminRole = await roleService.createRole('ADMIN');
  const user = await userRepository.findOneBy({
    email: 'makeAdminUser@gmail.com',
  });
  if (user === null) {
    return 'user not found';
  }
  const res = await app.inject({
    url: `/user/add-role/${user.userId}`,
    method: 'POST',
    payload: { roleId: `${adminRole.roleId}` },
  });
  t.equal(
    res.statusCode,
    statusCodes.OK_200,
    'Add role user operation should return status 200',
  );
  const resPayload = JSON.parse(res.payload);
  t.same(resPayload.email, 'makeAdminUser@gmail.com');

  t.after(async () => {
    await userService.delete(user.userId);
    await roleService.deleteRole(adminRole.roleId);
  });
});
