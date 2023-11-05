import { test } from 'tap';
import { build } from '../../helper';
import { statusCodes } from '../../../src/static-helpers/status-codes';
import { roleService } from '../../../src/services/roleService';

test('Delete role route', async (t) => {
  const app = await build(t);
  const role = await roleService.createRole('ARTIST');
  const res = await app.inject({
    url: `/role/${role.id}`,
    method: 'DELETE',
  });
  t.equal(
    res.statusCode,
    statusCodes.OK_200,
    'Delete role operation should return status 200',
  );
});
