import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./Product";

@Entity()
export class ProductTag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  productId: number;

  @Column()
  tagName: string;

  @ManyToOne(() => ProductTag, (productTag) => productTag.product)
  product: Product;
}
