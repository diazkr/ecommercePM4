import {Module} from "@nestjs/common"
import { ProductsController } from "./products.controller";
import { ProductsService } from "./products.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "./products.entity";
import { Category } from "../categories/categories.entity";
import { Order } from "src/orders/orders.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Product,Category, Order])],
    controllers: [ProductsController],
    providers: [ProductsService],
})

export class ProductsModule{}