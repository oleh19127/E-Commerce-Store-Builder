import { AppDataSource } from '../db/data-source';
import { ProductTag } from '../db/entity/ProductTag';

class ProductTagService {
  private productTagRepository = AppDataSource.getRepository(ProductTag);

  async createProductTag(productId: number, tagName: string) {
    const tag = new ProductTag();
    tag.productId = productId;
    tag.tagName = tagName;
    await this.productTagRepository.save(tag);
    return tag;
  }

  async getAllProductTags(productId: number) {
    return await this.productTagRepository.findAndCountBy({ productId });
  }
  async updateProductTag(id: number, tagName: string) {
    const tag = await this.productTagRepository.findOneBy({ id });
    if (tag === null) {
      return 'Tag not found';
    }
    tag.tagName = tagName;
    await this.productTagRepository.save(tag);
    return tag;
  }
  async deleteProductTag(id: number) {
    const destroyedTag = await this.productTagRepository.delete(id);
    if (destroyedTag.affected === 1) {
      return 'Tag successfully deleted!!!';
    }
    if (destroyedTag.affected === 0) {
      return 'There is no such tag to delete it!!!';
    }
  }
}

export const productTagService = new ProductTagService();
