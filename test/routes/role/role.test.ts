import { test } from 'tap';
import { build } from '../../helper';
import { statusCodes } from '../../../src/status-codes';
import { AppDataSource } from '../../../src/db/data-source';

test('user route', async (t) => {
  const app = await build(t);

  await AppDataSource.synchronize(true);
  // Test Create operation
  const createRole = await app.inject({
    url: '/role',
    method: 'POST',
    payload: { roleName: 'DESIGNER' },
  });

  t.equal(
    createRole.statusCode,
    statusCodes.CREATED_201,
    'Create role operation should return status 201',
  );

  // Test Read operation
  const getAllRoles = await app.inject({
    url: '/role',
    method: 'GET',
  });
  t.equal(
    getAllRoles.statusCode,
    200,
    'Read operation should return 200 status',
  );
  t.after(async () => {
    await AppDataSource.synchronize(true);
  });
});
