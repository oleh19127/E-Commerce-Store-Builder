import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Role } from "./Role";
import { Cart } from "./Cart";

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

  @OneToMany(() => Role, (role) => role.user)
  @JoinTable()
  roles: Role[];

  @OneToOne(() => User, (user) => user.cart)
  cart: Cart;
}
