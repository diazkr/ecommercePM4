import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './orders.entity';
import { OrdersController } from './orders.controller';
import { User } from '../users/users.entity';
import { OrderDetail } from '../ordersDetails/ordersDetails.entity';
import { Product } from '../products/products.entity';
import { OrdersService } from './orders.service';


@Module({
    imports: [TypeOrmModule.forFeature([Order, User, OrderDetail, Product])],
    controllers: [OrdersController],
    providers: [OrdersService],
})
export class OrdersModule {}
