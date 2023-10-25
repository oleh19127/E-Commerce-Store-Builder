import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Role } from './Role';
import { Cart } from './Cart';
import { Product } from './Product';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToMany(() => Role, (role) => role.users, {
    onDelete: 'CASCADE',
  })
  @JoinTable()
  roles: Role[];

  @OneToOne(() => User, (user) => user.cart, {
    onDelete: 'CASCADE',
  })
  cart: Cart;

  @OneToMany(() => User, (user) => user.products, {
    onDelete: 'CASCADE',
  })
  products: Product[];
}
