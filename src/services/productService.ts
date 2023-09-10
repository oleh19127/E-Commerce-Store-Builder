import { AppDataSource } from "../db/data-source";
import { Product } from "../db/entity/Product";

class ProductService {
  async createProduct(
    sku: number,
    price: number,
    subtitle: string,
    title: string,
    userId: number,
  ) {
    const productRepository = AppDataSource.getRepository(Product);
    const product = new Product();
    product.sku = sku;
    product.price = price;
    product.subtitle = subtitle;
    product.title = title;
    product.userId = userId;
    await productRepository.save(product);
    return product;
  }

  async getAll() {
    const productRepository = AppDataSource.getRepository(Product);
    return await productRepository.findAndCount();
  }
  async getOne(productId: number) {
    const productRepository = AppDataSource.getRepository(Product);
    return await productRepository.findOneBy({ id: productId });
  }

  async update(
    productId: number,
    sku: number,
    price: number,
    subtitle: string,
    title: string,
  ) {
    const productRepository = AppDataSource.getRepository(Product);
    const product = await productRepository.findOneBy({ id: productId });
    if (product === null) {
      return "Product not found!!!";
    }
    product.sku = sku;
    product.price = price;
    product.subtitle = subtitle;
    product.title = title;
    await productRepository.save(product);
    return product;
  }

  async delete(productId: number) {
    const productRepository = AppDataSource.getRepository(Product);
    const destroyedProduct = await productRepository.delete({ id: productId });
    if (destroyedProduct.affected === 1) {
      return "Product successfully deleted!!!";
    }
    if (destroyedProduct.affected === 0) {
      return "There is no such product to delete it!!!";
    }
  }
}

export const productService = new ProductService();
