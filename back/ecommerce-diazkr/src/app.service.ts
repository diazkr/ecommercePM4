import { Injectable, OnModuleInit } from '@nestjs/common';
import { CategoriesService } from './categories/categories.service';
import { Product } from './products/products.entity';
import { ProductsService } from './products/products.service';
import { UsersService } from './users/users.service';

@Injectable()
export class AppService implements OnModuleInit{

  constructor(
    private readonly categoriesService: CategoriesService,
    private readonly productsService: ProductsService,
    private readonly usersService: UsersService
  ){}

  async onModuleInit() {
    await this.categoriesService.seedCategories();
    await this.productsService.seedProducts();
    await this.usersService.seederUser();
  }

  getHello(): string {
    return 'Hello World!';
  }
}
