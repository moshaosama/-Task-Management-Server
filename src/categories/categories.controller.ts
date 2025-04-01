import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { AuthGuard } from 'src/AuthGuard/AuthGuard.service';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  getAllCategories() {
    return this.categoriesService.getAllCategories();
  }

  @Post()
  @UseGuards(AuthGuard)
  createCategory(@Body('Title') Title: string) {
    return this.categoriesService.createCategory(Title);
  }
}
