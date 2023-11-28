import { Entity, ManyToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User';
import { Product } from './Product';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  cartId: number;

  @OneToOne(() => User, (user) => user.cart)
  user: User;

  @ManyToMany(() => Product, (product) => product.carts)
  products: Product[];
}
