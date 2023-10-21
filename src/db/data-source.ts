import { DataSource } from 'typeorm';
import { User } from './entity/User';
import { Role } from './entity/Role';
import { Cart } from './entity/Cart';
import { CartProduct } from './entity/CartProduct';
import { ProductCategory } from './entity/ProductCategory';
import { ProductColor } from './entity/ProductColor';
import { ProductImage } from './entity/ProductImage';
import { ProductSize } from './entity/ProductSize';
import { ProductStyle } from './entity/ProductStyle';
import { ProductTag } from './entity/ProductTag';
import { ProductWeight } from './entity/ProductWeight';
import { Product } from './entity/Product';
import { ProductDescription } from './entity/ProductDescription';
import { ProductDescriptionInformation } from './entity/productDescriptionInformation';

const port = process.env.DATA_BASE_PORT
  ? parseInt(process.env.DATA_BASE_PORT)
  : undefined;

export const AppDataSource = new DataSource({
  type: 'postgres',
  port: port, // for local and external
  host: process.env.DATA_BASE_HOST, // for local only
  username: process.env.DATA_BASE_USER_NAME, // for local only
  password: process.env.DATA_BASE_PASSWORD, // for local only
  database: process.env.DATA_BASE_NAME, // for local only
  synchronize: true,
  // ssl: true, // external only
  // url: process.env.DATA_BASE_URL, // external only
  logging: true,
  entities: [
    User,
    Role,
    Cart,
    CartProduct,
    ProductCategory,
    ProductColor,
    ProductImage,
    ProductSize,
    ProductStyle,
    ProductTag,
    ProductWeight,
    Product,
    ProductDescription,
    ProductDescriptionInformation,
  ],
  subscribers: [],
  migrations: [],
});
