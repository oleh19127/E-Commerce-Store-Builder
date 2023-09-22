import { AppDataSource } from "../db/data-source";
import { ProductWeight } from "../db/entity/ProductWeight";

class ProductWeightService {
  private productWeightRepository = AppDataSource.getRepository(ProductWeight);
  async createWeight(productId: number, kg: number, lb: number) {
    const productWeight = new ProductWeight();
    productWeight.productId = productId;
    productWeight.kg = kg;
    productWeight.lb = lb;
    await this.productWeightRepository.save(productWeight);
    return productWeight;
  }

  async getAllProductWeights(productId: number) {
    return await this.productWeightRepository.findAndCountBy({ productId });
  }

  async updateWeight(id: number, kg: number, lb: number) {
    const productWeight = await this.productWeightRepository.findOneBy({ id });
    if (productWeight === null) {
      return "Weight not found";
    }
    productWeight.kg = kg;
    productWeight.lb = lb;
    await this.productWeightRepository.save(productWeight);
    return productWeight;
  }

  async deleteWeight(id: number) {
    const destroyedWeight = await this.productWeightRepository.delete(id);
    if (destroyedWeight.affected === 1) {
      return "Weight successfully deleted!!!";
    }
    if (destroyedWeight.affected === 0) {
      return "There is no such weight to delete it!!!";
    }
  }
}

export const productWeightService = new ProductWeightService();
