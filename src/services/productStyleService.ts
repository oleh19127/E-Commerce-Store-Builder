import { AppDataSource } from "../db/data-source";
import { ProductStyle } from "../db/entity/ProductStyle";

class ProductStyleService {
  private productStyleRepository = AppDataSource.getRepository(ProductStyle);
  async createProductStyle(productId: number, styleName: string) {
    const productStyle = new ProductStyle();
    productStyle.productId = productId;
    productStyle.styleName = styleName;
    await this.productStyleRepository.save(productStyle);
    return productStyle;
  }
  async getAllProductStyle(productId: number) {
    return await this.productStyleRepository.findAndCountBy({ productId });
  }
  async updateProductStyle(id: number, styleName: string) {
    const productStyle = await this.productStyleRepository.findOneBy({ id });
    if (productStyle === null) {
      return "Product style not found";
    }
    productStyle.styleName = styleName;
    await this.productStyleRepository.save(productStyle);
    return productStyle;
  }
  async deleteProductStyle(id: number) {
    const destroyedProductStyle = await this.productStyleRepository.delete(id);
    if (destroyedProductStyle.affected === 1) {
      return "Product style successfully deleted!!!";
    }
    if (destroyedProductStyle.affected === 0) {
      return "There is no such product style to delete it!!!";
    }
  }
}

export const productStyleService = new ProductStyleService();
