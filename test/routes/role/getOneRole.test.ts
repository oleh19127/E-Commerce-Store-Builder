import { test } from 'tap';
import { build } from '../../helper';
import { statusCodes } from '../../../src/static-helpers/status-codes';
import { roleService } from '../../../src/services/roleService';

test('Get one role route', async (t) => {
  const app = await build(t);
  const role = await roleService.createRole('PROGRAMMER');
  const res = await app.inject({
    url: `/role/get-one/${role.id}`,
    method: 'GET',
  });
  const resPayload = JSON.parse(res.payload);
  t.same(resPayload.roleName, 'PROGRAMMER');
  t.equal(
    res.statusCode,
    statusCodes.OK_200,
    'Get one role operation should return status 200',
  );
  t.after(async () => {
    await roleService.deleteRole(role.id);
  });
});
