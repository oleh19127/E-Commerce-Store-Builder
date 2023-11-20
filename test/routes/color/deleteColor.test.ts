import { test } from 'tap';
import { build } from '../../helper';
import { statusCodes } from '../../../src/static-helpers/status-codes';
import { colorService } from '../../../src/services/colorService';

test('Delete color route', async (t) => {
  const app = await build(t);
  const color = await colorService.createColor('delete color');
  const res = await app.inject({
    url: `/color/${color.colorId}`,
    method: 'DELETE',
  });
  t.equal(
    res.statusCode,
    statusCodes.OK_200,
    'Delete color operation should return status 200',
  );
});
