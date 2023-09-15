import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./Product";

@Entity()
export class ProductColor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  productId: number;

  @Column({ unique: true })
  colorValue: string;

  @ManyToOne(() => ProductColor, (productColor) => productColor.product)
  product: Product;
}
