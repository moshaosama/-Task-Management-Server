import { Injectable } from '@nestjs/common';
import { Category } from './entities/category.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
  ) {}

  async createCategory(Title: string): Promise<Category> {
    const newCategory = new this.categoryModel({ Title });
    return newCategory.save();
  }

  async getAllCategories() {
    return await this.categoryModel.find();
  }
}
