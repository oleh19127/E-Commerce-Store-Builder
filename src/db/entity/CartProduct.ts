import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Cart } from './Cart';
import { Product } from './Product';

@Entity()
export class CartProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cartId: number;

  @ManyToOne(() => CartProduct, (cartProduct) => cartProduct.cart)
  cart: Cart;

  @OneToMany(() => CartProduct, (cartProduct) => cartProduct.product)
  product: Product[];
}
