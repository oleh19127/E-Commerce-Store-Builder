import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './User';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 'USER' })
  roleName: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column()
  userId: number;
  @ManyToMany(() => User, (user) => user.roles)
  users: User[];
}
