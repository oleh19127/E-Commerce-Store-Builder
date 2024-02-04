import { AppDataSource } from '../db/data-source';
import { Product } from '../db/entity/Product';
import { Color } from '../db/entity/Color';

class ProductService {
  private productRepository = AppDataSource.getRepository(Product);
  private colorRepository = AppDataSource.getRepository(Color);
  async createProduct(
    sku: number,
    price: number,
    subtitle: string,
    title: string,
  ) {
    const product = this.productRepository.create({
      sku,
      price,
      subtitle,
      title,
    });
    await this.productRepository.insert(product);
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
    await this.productRepository.update(
      {
        sku: product.sku,
        price: product.price,
        subtitle: product.subtitle,
        title: product.title,
      },
      {
        sku,
        price,
        subtitle,
        title,
      },
    );
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

  async addColor(productId: number, colorId: number) {
    const product = await this.productRepository.findOne({
      where: { productId },
      relations: ['colors'],
    });
    if (product === null) {
      return { message: 'Product not found' };
    }
    const color = await this.colorRepository.findOneBy({ colorId });
    if (color === null) {
      return { message: 'Color not found' };
    }
    product.colors.push(color);
    await this.productRepository.save(product);
    return product;
  }

  async deleteColor(productId: number, colorValue: string) {
    const product = await this.productRepository.findOne({
      where: { productId },
      relations: ['colors'],
    });
    if (product === null) {
      return { message: 'Product not found' };
    }

    product.colors = product.colors.filter((color) => {
      return color.colorValue !== colorValue;
    });
    await this.productRepository.save(product);
    return product;
  }
}

export const productService = new ProductService();
