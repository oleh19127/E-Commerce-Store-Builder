import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Product } from './Product';

@Entity()
export class Color {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  colorValue: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToMany(() => Color, (color) => color.products)
  products: Product[];
}
