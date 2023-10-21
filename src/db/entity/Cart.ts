import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './User';
import { CartProduct } from './CartProduct';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @OneToOne(() => Cart, (cart) => cart.user)
  user: User;

  @OneToMany(() => Cart, (cart) => cart.cartProduct)
  cartProduct: CartProduct[];
}
