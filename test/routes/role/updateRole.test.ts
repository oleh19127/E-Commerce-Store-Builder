import { test } from 'tap';
import { build } from '../../helper';
import { statusCodes } from '../../../src/static-helpers/status-codes';
import { roleService } from '../../../src/services/roleService';

test('Update role route', async (t) => {
  const app = await build(t);
  const role = await roleService.createRole('DEVELOPER');
  const res = await app.inject({
    url: `/role/${role.roleId}`,
    method: 'PUT',
    payload: { roleName: 'JUNIOR-DEVELOPER' },
  });
  t.equal(
    res.statusCode,
    statusCodes.OK_200,
    'Update role operation should return status 200',
  );
  const resPayload = JSON.parse(res.payload);
  t.same(resPayload.roleName, 'JUNIOR-DEVELOPER');

  t.after(async () => {
    await roleService.deleteRole(resPayload.roleId);
  });
});
