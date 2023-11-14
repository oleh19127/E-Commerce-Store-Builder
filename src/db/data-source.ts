import { DataSource } from 'typeorm';
import { User } from './entity/User';
import { Role } from './entity/Role';

const port = process.env.DATA_BASE_PORT
  ? parseInt(process.env.DATA_BASE_PORT)
  : undefined;

export const AppDataSource = new DataSource({
  type: 'postgres',
  port: port, // for local and external
  // host: process.env.DATA_BASE_HOST, // for local only
  // username: process.env.DATA_BASE_USER_NAME, // for local only
  // password: process.env.DATA_BASE_PASSWORD, // for local only
  // database: process.env.DATA_BASE_NAME, // for local only
  ssl: true, // external only
  url: process.env.DATA_BASE_URL, // external only
  synchronize: true,
  logging: true,
  entities: [User, Role],
});
