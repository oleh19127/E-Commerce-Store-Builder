import { test } from 'tap';
import { build } from '../../helper';
import { statusCodes } from '../../../src/static-helpers/status-codes';
import { colorService } from '../../../src/services/colorService';

test('Create color route', async (t) => {
  const app = await build(t);
  const res = await app.inject({
    url: '/color',
    method: 'POST',
    payload: { colorValue: 'green' },
  });
  t.equal(
    res.statusCode,
    statusCodes.CREATED_201,
    'Create role operation should return status 201',
  );
  const resPayload = JSON.parse(res.payload);
  t.same(resPayload.colorValue, 'green');

  t.after(async () => {
    await colorService.deleteColor(resPayload.colorId);
  });
});
