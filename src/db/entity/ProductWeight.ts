import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './Product';

@Entity()
export class ProductWeight {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  productId: number;

  @Column()
  kg: number;

  @Column()
  lb: number;

  @OneToOne(() => ProductWeight, (productWeight) => productWeight.product)
  product: Product;
}
