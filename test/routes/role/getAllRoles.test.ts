import { test } from 'tap';
import { build } from '../../helper';
import { statusCodes } from '../../../src/static-helpers/status-codes';

test('Get all roles route', async (t) => {
  const app = await build(t);
  const res = await app.inject({
    url: '/role',
    method: 'GET',
  });
  t.equal(
    res.statusCode,
    statusCodes.OK_200,
    'Get all roles operation should return status 200',
  );
});
