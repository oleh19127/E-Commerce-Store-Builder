import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProductColor } from './ProductColor';
import { ProductSize } from './ProductSize';
import { ProductTag } from './ProductTag';
import { ProductStyle } from './ProductStyle';
import { ProductWeight } from './ProductWeight';
import { ProductImage } from './ProductImage';
import { ProductCategory } from './ProductCategory';
import { ProductDescription } from './ProductDescription';
import { Cart } from './Cart';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  subtitle: string;

  @Column()
  price: number;

  @Column()
  sku: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToMany(() => Product, (product) => product.carts)
  carts: Cart[];

  @OneToMany(() => Product, (product) => product.productColors)
  productColors: ProductColor[];

  @OneToMany(() => Product, (product) => product.productSizes)
  productSizes: ProductSize[];

  @OneToMany(() => Product, (product) => product.productTags)
  productTags: ProductTag[];

  @OneToMany(() => Product, (product) => product.productStyles)
  productStyles: ProductStyle[];

  @OneToOne(() => Product, (product) => product.productWeight)
  productWeight: ProductWeight;

  @OneToMany(() => Product, (product) => product.productImages)
  productImages: ProductImage[];

  @OneToMany(() => Product, (product) => product.productCategories)
  productCategories: ProductCategory[];

  @OneToOne(() => Product, (product) => product.productDescription)
  productDescription: ProductDescription;
}
