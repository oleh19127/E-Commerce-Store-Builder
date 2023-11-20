import { AppDataSource } from '../db/data-source';
import { Color } from '../db/entity/Color';

class ColorService {
  private colorRepository = AppDataSource.getRepository(Color);
  async createColor(colorValue: string) {
    const color = new Color();
    color.colorValue = colorValue;
    await this.colorRepository.save(color);
    return color;
  }

  async getAllColors() {
    return await this.colorRepository.find();
  }

  async updateColor(colorId: number, colorValue: string) {
    const color = await this.colorRepository.findOneBy({ colorId });
    if (color === null) {
      return 'Color not found!!!';
    }
    color.colorValue = colorValue;
    await this.colorRepository.save(color);
    return color;
  }

  async deleteColor(colorId: number) {
    const destroyedColor = await this.colorRepository.delete({
      colorId,
    });
    if (destroyedColor.affected === 1) {
      return 'Color successfully deleted!!!';
    }
    if (destroyedColor.affected === 0) {
      return 'There is no such color to delete it!!!';
    }
  }
}

export const colorService = new ColorService();
