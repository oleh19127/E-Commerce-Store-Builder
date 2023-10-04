import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProductDescription } from "./ProductDescription";

@Entity()
export class ProductDescriptionInformation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  productDescriptionId: number;

  @Column()
  text: string;

  @ManyToOne(
    () => ProductDescriptionInformation,
    (productDescriptionInformation) =>
      productDescriptionInformation.productDescription,
  )
  productDescription: ProductDescription;
}
