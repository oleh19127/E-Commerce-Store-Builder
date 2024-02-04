import { AppDataSource } from '../db/data-source';
import { ProductSize } from '../db/entity/ProductSize';

class ProductSizeService {
  private productSizeRepository = AppDataSource.getRepository(ProductSize);
  async createSize(productId: number, sizeName: string) {
    const size = this.productSizeRepository.create({
      productId,
      sizeName,
    });
    await this.productSizeRepository.insert(size);
    return size;
  }

  async getAllProductSizes(productId: number) {
    return await this.productSizeRepository.findAndCountBy({ productId });
  }

  async updateProductSize(productId: number, sizeName: string) {
    const size = await this.productSizeRepository.findOneBy({ productId });
    if (size === null) {
      return 'Size not found';
    }
    await this.productSizeRepository.update(
      {
        sizeName: size.sizeName,
      },
      {
        sizeName,
      },
    );
    return size;
  }

  async deleteProductSize(productId: number) {
    const destroyedSize = await this.productSizeRepository.delete(productId);
    if (destroyedSize.affected === 1) {
      return 'Size successfully deleted!!!';
    }
    if (destroyedSize.affected === 0) {
      return 'There is no such size to delete it!!!';
    }
  }

  async getOneProductSize(id: number) {
    const size = await this.productSizeRepository.findOneBy({ id });
    if (size === null) {
      return 'Size not found';
    }
    return size;
  }
}

export const productSizeService = new ProductSizeService();
