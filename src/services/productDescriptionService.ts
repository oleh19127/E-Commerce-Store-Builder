import { AppDataSource } from '../db/data-source';
import { ProductDescription } from '../db/entity/ProductDescription';

class ProductDescriptionService {
  private productDescriptionRepository =
    AppDataSource.getRepository(ProductDescription);
  async createProductDescription(productId: number, text: string) {
    const productDescription = new ProductDescription();
    productDescription.productId = productId;
    productDescription.text = text;
    await this.productDescriptionRepository.save(productDescription);
    return productDescription;
  }

  async getAllProductDescription(productId: number) {
    return await this.productDescriptionRepository.findAndCountBy({
      productId,
    });
  }

  async updateProductDescription(id: number, text: string) {
    const productDescription =
      await this.productDescriptionRepository.findOneBy({ id });
    if (productDescription === null) {
      return 'Product description not found';
    }
    productDescription.text = text;
    await this.productDescriptionRepository.save(productDescription);
    return productDescription;
  }

  async deleteProductDescription(id: number) {
    const destroyedProductDescription =
      await this.productDescriptionRepository.delete(id);
    if (destroyedProductDescription.affected === 1) {
      return 'Product description successfully deleted!!!';
    }
    if (destroyedProductDescription.affected === 0) {
      return 'There is no such product description to delete it!!!';
    }
  }
}

export const productDescriptionService = new ProductDescriptionService();
