import { test } from 'tap';
import { build } from '../../helper';
import { statusCodes } from '../../../src/static-helpers/status-codes';
import { userService } from '../../../src/services/userService';
import { AppDataSource } from '../../../src/db/data-source';
import { User } from '../../../src/db/entity/User';
import { roleService } from '../../../src/services/roleService';

test('delete role user route', async (t) => {
  const app = await build(t);
  const userRepository = AppDataSource.getRepository(User);
  await userService.createUser('dedleteRoleFromUser@gmail.com', 'pass');
  const role = await roleService.createRole('DESIGNER');
  const user = await userRepository.findOneBy({
    email: 'dedleteRoleFromUser@gmail.com',
  });
  if (user === null) {
    return 'user not found';
  }
  const res = await app.inject({
    url: `/user/delete-role/${user.userId}`,
    method: 'DELETE',
    payload: { roleName: `${role.roleName}` },
  });
  t.equal(
    res.statusCode,
    statusCodes.OK_200,
    'Delete role user operation should return status 200',
  );
  const resPayload = JSON.parse(res.payload);
  t.same(resPayload.email, 'dedleteRoleFromUser@gmail.com');

  t.after(async () => {
    await userService.delete(user.userId);
    await roleService.deleteRole(role.roleId);
  });
});
