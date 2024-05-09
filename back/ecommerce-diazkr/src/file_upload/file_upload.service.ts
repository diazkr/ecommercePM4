import { Injectable, NotFoundException } from '@nestjs/common';
import { FileUploadRepository } from './file_upload.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../products/products.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FileUploadService {
  constructor(
    private readonly fileUploadRepository: FileUploadRepository,
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
  ) {}

  async uploadImage(file: Express.Multer.File, productId: string) {
    const productById = await this.productsRepository.findOneBy({
      id: productId,
    });
    if (!productById) {
      throw new NotFoundException(`No se encontró producto con ese id`);
    }

    const response = await this.fileUploadRepository.uploadImage(file);

    await this.productsRepository.update(productId, {
        imgUrl : response.secure_url,
    });

    const foundProduct = await this.productsRepository.findOneBy({
        id: productId,
      });

    return foundProduct;
  }
}

