import {
  Entity,
  JoinColumn,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './User';
import { Product } from './Product';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Cart, (cart) => cart.user)
  @JoinColumn()
  user: User;

  @ManyToMany(() => Cart, (cart) => cart.products)
  products: Product[];
}
