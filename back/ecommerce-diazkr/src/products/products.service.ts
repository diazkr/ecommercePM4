import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Product } from './products.entity';
import { ProductDto } from '../Dto/productsDto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../categories/categories.entity';
import { defaultProducts } from '../database/productsDataBase';
import { Order } from 'src/orders/orders.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productsRepository: Repository<Product>,
    @InjectRepository(Category) private categoriesRepository: Repository<Category>,
    @InjectRepository(Order) private ordersRepository: Repository<Order>
  ) {}

  async getProducts(page: number, limit:number) {

    const allProducts= await this.productsRepository.find({
      relations:{
        category:true
      }
    });
    console.log(allProducts)
    const start = (page - 1)*limit;
    const end = start + limit;
    const productsList = allProducts.slice(start,end)
    return productsList;
  }
  
  async getById(id:string) {
    const productById = await this.productsRepository.findOneBy({id});
    if(!productById){
      throw new NotFoundException(`No se encontró producto con ese id`)
    }
    return productById;
  }

  async createProduct(productDto: ProductDto) {
    const { category: categoryName, ...productData } = productDto;
    const category = await this.categoriesRepository.findOne({
      where: { name: categoryName },
    });

    if (!category) {
      throw new NotFoundException(`No se encontró esa categoria`);
    }
    const product = new Product();
    product.category = category;
    Object.assign(product, productData);
    return await this.productsRepository.save(product);
  }

  async updateProduct(id:string, product: Partial<ProductDto>) {
    const existingProduct = await this.productsRepository.findOneBy({id});
    if (!existingProduct) {
      throw new NotFoundException(`Product con id ${id} no encontrado`);
    }
    const { category: categoryName, ...productData } = product;

    // Si se proporciona una nueva categoría, buscarla por nombre
    let category;
    if (categoryName) {
      category = await this.categoriesRepository.findOne({
        where: { name: categoryName },
      });
      if (!category) {
        throw new NotFoundException(`Category ${categoryName} no encontrada`);
      }
    }
    if (category) {
      existingProduct.category = category;
    }
    Object.assign(existingProduct, productData);
    const result = await this.productsRepository.save(existingProduct);

    return result;
  }

  async deleteProduct(id:string) {
    const existingProduct = await this.productsRepository.findOneBy({id});
    if (!existingProduct) {
      throw new NotFoundException(`No se encontró producto con ese id`);
    }

    await this.productsRepository.remove(existingProduct);
    return { message: `Product with id ${id} deleted successfully`, id };
  }

  async seedProducts() {
    const products = await this.productsRepository.find();
    const orders = await this.ordersRepository.find();
    if(orders.length > 0 ){
        throw new BadRequestException('No se puede agregar productos ya que hay ordenes en proceso')
    }
    if (products.length === 0) {
      await Promise.all(
        defaultProducts.map(async (productData) => {
          const { category: categoryName, ...rest } = productData;
          const category = await this.categoriesRepository.findOne({
            where: { name: categoryName },
          });

          if (!category) {
            throw new Error(`Category ${categoryName} not found`);
          }

          const product = this.productsRepository.create({
            ...rest,
            category,
          });
          await this.productsRepository.save(product);
        }),
      );
    }
    console.log('Se han precarado los datos de productos')
    return {success: 'Se han precarado los datos de productos'};
  }
}

