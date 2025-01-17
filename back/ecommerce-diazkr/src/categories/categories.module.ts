import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './categories.entity';
import { Order } from 'src/orders/orders.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Category, Order])],
    controllers: [CategoriesController],
    providers: [CategoriesService],
})

export class CategoriesModule {}
