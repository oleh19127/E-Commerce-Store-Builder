import { test } from 'tap';
import { build } from '../helper';

test('default user route', async (t) => {
  const app = await build(t);

  const res = await app.inject({
    url: '/user/one/1',
  });
  t.same(JSON.parse(res.payload), {
    id: 1,
    email: 'oleh19127@gmail.com',
    password: '$2b$04$AXuGFOqPvUDPO41yVyyGruo8e.NRpe0Nm.0ue4V8YHqatdJ3LsPoW',
    created_at: '2023-10-25T17:14:00.839Z',
    updated_at: '2023-10-25T17:14:00.839Z',
  });
});
