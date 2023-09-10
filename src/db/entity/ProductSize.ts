import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./Product";

@Entity()
export class ProductSize {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  productId: number;

  @Column()
  size: string;

  @ManyToOne(() => ProductSize, (productSize) => productSize.product)
  product: Product;
}
