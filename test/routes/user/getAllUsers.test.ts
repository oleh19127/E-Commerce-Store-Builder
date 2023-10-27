import { test } from 'tap';
import { build } from '../../helper';

test('get all users route', async (t) => {
  const app = await build(t);

  const res = await app.inject({
    url: '/user/all',
  });
  t.same(JSON.parse(res.payload), [
    [
      {
        id: 1,
        email: 'oleh19127@gmail.com',
        password:
          '$2b$04$AXuGFOqPvUDPO41yVyyGruo8e.NRpe0Nm.0ue4V8YHqatdJ3LsPoW',
        created_at: '2023-10-25T17:14:00.839Z',
        updated_at: '2023-10-25T17:14:00.839Z',
        roles: [
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
      },
    ],
    1,
  ]);
});
