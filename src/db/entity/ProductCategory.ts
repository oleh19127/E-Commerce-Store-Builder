import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './Product';

@Entity()
export class ProductCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  productId: number;

  @Column()
  categoryName: string;

  @ManyToOne(
    () => ProductCategory,
    (productCategory) => productCategory.product,
  )
  product: Product;
}
