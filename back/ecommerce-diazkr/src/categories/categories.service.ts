import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './categories.entity';
import { Repository } from 'typeorm';
import { categoriesDto } from 'src/Dto/categoriesDto';
import { Order } from 'src/orders/orders.entity';

@Injectable()
export class CategoriesService{
    constructor(
        @InjectRepository(Category) private categoriesRepository: Repository<Category>,
        @InjectRepository(Order) private ordersRepository: Repository<Order>
    ){}

    async addCategory(category: categoriesDto){
        const sameName = await this.categoriesRepository.findOne({where:{name: category.name}})
        if(sameName){
            throw new ConflictException("La categoria ya existe")
        }

        return await this.categoriesRepository.save(category)
    }

    async getCategories(){
        return await this.categoriesRepository.find();
    }

    
    async seedCategories() {
    const categories = await this.categoriesRepository.find();
    const orders = await this.ordersRepository.find();
    if(orders.length > 0 ){
        throw new BadRequestException('No se puede agregar categorias ya que hay ordenes en proceso')
    }
    if (categories.length === 0 || categories.length === 1) {
        const defaultCategories = ['Accesorios', 'Blusas', 'Pantalones', 'Zapatos', 'Faldas', 'Vestidos'];
        await Promise.all(defaultCategories.map(name => this.categoriesRepository.save({ name })));

    }
    console.log('Se han precargado los datos base de categorias')
    return {success: "Se han precargado los datos base de categorias"}
    }

}
