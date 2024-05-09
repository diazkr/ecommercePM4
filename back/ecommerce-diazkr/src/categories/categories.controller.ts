import { Body, Controller, Get, Post } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { categoriesDto } from 'src/Dto/categoriesDto';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService){}

    @Get()
    async getCategories(){
        return await this.categoriesService.getCategories()
    }

    @Post('addCategory')
    async addCategory(@Body() category:categoriesDto ){
        return await this.categoriesService.addCategory(category)

    }

    @Get('seeder')
    async seedCategories() {
    return await this.categoriesService.seedCategories();
  }
}
