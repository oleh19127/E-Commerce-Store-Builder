import { test } from 'tap';
import { build } from '../../helper';
import { statusCodes } from '../../../src/static-helpers/status-codes';

test('Get all users route', async (t) => {
  const app = await build(t);
  const res = await app.inject({
    url: '/user/all',
    method: 'GET',
  });
  t.equal(
    res.statusCode,
    statusCodes.OK_200,
    'Get all users operation should return status 200',
  );
});
