import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Product } from "./Product";
import { ProductDescriptionInformation } from "./productDescriptionInformation";

@Entity()
export class ProductDescription {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  productId: number;

  @Column()
  text: string;

  @OneToOne(
    () => ProductDescription,
    (productDescription) => productDescription.product,
  )
  product: Product;

  @OneToMany(
    () => ProductDescription,
    (productDescription) => productDescription.productDescriptionInformation,
  )
  productDescriptionInformation: ProductDescriptionInformation[];
}
