import { DataSource } from 'typeorm';
import { User } from './entity/User';
import { Role } from './entity/Role';
import { Product } from './entity/Product';
import { Color } from './entity/Color';
import { Cart } from './entity/Cart';

const port = process.env.DB_PORT ? parseInt(process.env.DB_PORT) : undefined;

export const AppDataSource = new DataSource({
  type: 'postgres',
  port: port, // for local and external
  host: process.env.DB_HOST, // for local only
  username: process.env.POSTGRES_USER, // for local only
  password: process.env.POSTGRES_PASSWORD, // for local only
  database: process.env.POSTGRES_DB, // for local only
  // ssl: true, // external only
  // url: process.env.DATA_BASE_URL, // external only
  synchronize: true,
  logging: true,
  entities: [User, Role, Product, Color, Cart],
});
