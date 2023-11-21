import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Color } from './Color';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  productId: number;

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

  @ManyToMany(() => Color, (color) => color.products, {
    onDelete: 'CASCADE',
  })
  @JoinTable()
  colors: Color[];
}
