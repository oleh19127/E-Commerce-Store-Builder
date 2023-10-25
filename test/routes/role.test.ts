import { test } from 'tap';
import { build } from '../helper';

test('default role route', async (t) => {
  const app = await build(t);

  const res = await app.inject({
    url: '/role',
  });
  t.same(JSON.parse(res.payload), [
    [
      {
        id: 1,
        roleName: 'USER',
        created_at: '2023-10-25T17:07:28.656Z',
        updated_at: '2023-10-25T17:07:28.656Z',
      },
      {
        id: 2,
        roleName: 'ADMIN',
        created_at: '2023-10-25T17:07:38.393Z',
        updated_at: '2023-10-25T17:07:38.393Z',
      },
    ],
    2,
  ]);
});
