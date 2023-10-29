import { test } from 'tap';
import { build } from '../../helper';
import { AppDataSource } from '../../../src/db/data-source';
import { roleService } from '../../../src/services/roleService';
import { statusCodes } from '../../../src/status-codes';

test('user route', async (t) => {
  const app = await build(t);

  // Clean the database before each test
  await AppDataSource.synchronize(true);

  t.before(async () => {
    await roleService.createRole('USER');
    await roleService.createRole('ADMIN');
  });

  // Test Create operation
  const createUser = await app.inject({
    url: '/user/registration',
    method: 'POST',
    payload: { email: 'oleh19127@gmail.com', password: 'some password' },
  });

  const userAccessToken = JSON.parse(createUser.payload);
  t.equal(
    createUser.statusCode,
    statusCodes.CREATED_201,
    'Create operation should return status 201',
  );
  t.ok(userAccessToken, 'Create operation should return access token');

  // Test Read operation
  const getUser = await app.inject({
    url: '/user/one/1',
    method: 'GET',
  });
  t.equal(getUser.statusCode, 200, 'Read operation should return 200 status');

  // Test Update operation
  const updateUser = await app.inject({
    method: 'PUT',
    url: '/user/1',
    payload: {
      email: 'haluna@gmail.com',
    },
  });

  t.equal(
    updateUser.statusCode,
    200,
    'Update operation should return 200 status',
  );

  // Test Read operation after update
  const updatedReadUser = await app.inject({
    url: '/user/one/1',
    method: 'GET',
  });

  t.equal(
    updatedReadUser.statusCode,
    statusCodes.OK_200,
    'Read operation after update should return status code 200',
  );

  // Test Getting all users operation
  const allUsers = await app.inject({
    url: '/user/all',
    method: 'GET',
  });

  t.equal(
    allUsers.statusCode,
    statusCodes.OK_200,
    'Read operation should return status code 200',
  );

  // Test make user admin operation
  const makingAdminUser = await app.inject({
    url: '/user/make-admin/1',
    method: 'POST',
  });

  t.equal(
    makingAdminUser.statusCode,
    statusCodes.OK_200,
    'Create operation should return status code 200',
  );

  // Test delete user operation
  const deletedUser = await app.inject({
    url: '/user/1',
    method: 'DELETE',
  });

  t.equal(
    deletedUser.statusCode,
    statusCodes.OK_200,
    'Delete operation should return status code 200',
  );
});
