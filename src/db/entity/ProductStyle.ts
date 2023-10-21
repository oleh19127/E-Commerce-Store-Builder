import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './Product';

@Entity()
export class ProductStyle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  productId: number;

  @Column()
  styleName: string;

  @ManyToOne(() => ProductStyle, (productStyle) => productStyle.product)
  product: Product;
}
