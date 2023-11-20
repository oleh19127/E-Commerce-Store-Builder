import { test } from 'tap';
import { build } from '../../helper';
import { statusCodes } from '../../../src/static-helpers/status-codes';
import { roleService } from '../../../src/services/roleService';

test('Create role route', async (t) => {
  const app = await build(t);
  const res = await app.inject({
    url: '/role',
    method: 'POST',
    payload: { roleName: 'DESIGNER' },
  });
  t.equal(
    res.statusCode,
    statusCodes.CREATED_201,
    'Create role operation should return status 201',
  );
  const resPayload = JSON.parse(res.payload);
  t.same(resPayload.roleName, 'DESIGNER');

  t.after(async () => {
    await roleService.deleteRole(resPayload.roleId);
  });
});
