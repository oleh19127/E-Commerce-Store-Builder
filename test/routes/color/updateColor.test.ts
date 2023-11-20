import { test } from 'tap';
import { build } from '../../helper';
import { statusCodes } from '../../../src/static-helpers/status-codes';
import { colorService } from '../../../src/services/colorService';

test('Update color route', async (t) => {
  const app = await build(t);
  const color = await colorService.createColor('update color route');
  const res = await app.inject({
    url: `/color/${color.colorId}`,
    method: 'PUT',
    payload: { colorValue: 'updated color' },
  });
  t.equal(
    res.statusCode,
    statusCodes.OK_200,
    'Update color operation should return status 200',
  );
  const resPayload = JSON.parse(res.payload);
  t.same(resPayload.colorValue, 'updated color');

  t.after(async () => {
    await colorService.deleteColor(resPayload.colorId);
  });
});
