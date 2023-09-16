import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./Product";

@Entity()
export class ProductImage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  productId: number;

  @Column({ unique: true })
  src: string;

  @Column({ unique: true })
  thumb: string;

  @ManyToOne(() => ProductImage, (productImage) => productImage.product)
  product: Product;
}
