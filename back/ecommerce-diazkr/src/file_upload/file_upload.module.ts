import { Module } from '@nestjs/common';
import { FileUploadService } from './file_upload.service';
import { FileUploadController } from './file_upload.controller';
import { CloudinaryConfig } from '../config/cloudinary';
import { FileUploadRepository } from './file_upload.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../products/products.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  providers: [FileUploadService, CloudinaryConfig, FileUploadRepository],
  controllers: [FileUploadController]
})
export class FileUploadModule {}