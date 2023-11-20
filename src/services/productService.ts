import { AppDataSource } from '../db/data-source';
import { Product } from '../db/entity/Product';

class ProductService {
  private productRepository = AppDataSource.getRepository(Product);
  async createProduct(
    sku: number,
    price: number,
    subtitle: string,
    title: string,
  ) {
    const product = new Product();
    product.sku = sku;
    product.price = price;
    product.subtitle = subtitle;
    product.title = title;
    await this.productRepository.save(product);
    return product;
  }

  async getAll() {
    return await this.productRepository.find({ relations: ['colors'] });
  }
  async getOne(productId: number) {
    const product = await this.productRepository.findOne({
      where: { productId },
      relations: ['colors'],
    });
    if (product === null) {
      return 'product not found!!!';
    }
    return product;
  }

  async update(
    productId: number,
    sku: number,
    price: number,
    subtitle: string,
    title: string,
  ) {
    const product = await this.productRepository.findOneBy({ productId });
    if (product === null) {
      return 'Product not found!!!';
    }
    product.sku = sku;
    product.price = price;
    product.subtitle = subtitle;
    product.title = title;
    await this.productRepository.save(product);
    return product;
  }

  async delete(productId: number) {
    const destroyedProduct = await this.productRepository.delete({
      productId,
    });
    if (destroyedProduct.affected === 1) {
      return 'Product successfully deleted!!!';
    }
    if (destroyedProduct.affected === 0) {
      return 'There is no such product to delete it!!!';
    }
  }
}

export const productService = new ProductService();
