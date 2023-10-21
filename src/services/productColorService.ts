import { AppDataSource } from '../db/data-source';
import { ProductColor } from '../db/entity/ProductColor';

class ProductColorService {
  private productColorRepository = AppDataSource.getRepository(ProductColor);
  async createColor(productId: number, colorValue: string) {
    const color = new ProductColor();
    color.productId = productId;
    color.colorValue = colorValue;
    await this.productColorRepository.save(color);
    return color;
  }

  async getAllProductColors(productId: number) {
    return await this.productColorRepository.findAndCountBy({ productId });
  }

  async updateColor(id: number, colorValue: string) {
    const color = await this.productColorRepository.findOneBy({ id });
    if (color === null) {
      return 'Color not found!!!';
    }
    color.colorValue = colorValue;
    await this.productColorRepository.save(color);
    return color;
  }

  async deleteColor(id: number) {
    const destroyedColor = await this.productColorRepository.delete(id);
    if (destroyedColor.affected === 1) {
      return 'Color successfully deleted!!!';
    }
    if (destroyedColor.affected === 0) {
      return 'There is no such color to delete it!!!';
    }
  }
}

export const productColorService = new ProductColorService();
