import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { CartProduct } from "./CartProduct";

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cartProductId: number;

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

  @ManyToOne(() => Product, (product) => product.cartProduct)
  cartProduct: CartProduct;
}
