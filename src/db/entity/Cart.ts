import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @OneToOne(() => Cart, (cart) => cart.user)
  user: User;
}
