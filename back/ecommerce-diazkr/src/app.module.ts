import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from './users/users.entity';
import { Product } from './products/products.entity';
import { Order } from './orders/orders.entity';
import { OrderDetail } from './ordersDetails/ordersDetails.entity';
import { Category } from './categories/categories.entity';
import { CategoriesModule } from './categories/categories.module';
import { OrdersModule } from './orders/orders.module';
import { FileUploadModule } from './file_upload/file_upload.module';
import { JwtModule } from '@nestjs/jwt';
import { CategoriesService } from './categories/categories.service';
import { ProductsService } from './products/products.service';
import { OrdersService } from './orders/orders.service';
import { UsersService } from './users/users.service';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './.env.development',
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (ConfigService: ConfigService) => ({
        type: 'postgres',
        database: ConfigService.get('DB_NAME'),
        host: ConfigService.get('DB_HOST'),
        // host: 'postgresdb',
        port: ConfigService.get('DB_PORT'),
        username: ConfigService.get('DB_USERNAME'),
        password: ConfigService.get('DB_PASSWORD'),
        entities: [User, Product, Order, OrderDetail, Category],
        autoLoadEntities: true,
        synchronize: false,
        //logging: true, Ver codigo SQL
        dropSchema: false,
      }),
    }),
    TypeOrmModule.forFeature([Category, Product, Order, User]),
    UsersModule,
    ProductsModule,
    AuthModule,
    CategoriesModule,
    OrdersModule,
    FileUploadModule,
    JwtModule.register({
      global: true, 
      signOptions:{
        expiresIn: '1h'
      },
      secret: process.env.JWT_SECRET,
    })
  ],
  controllers: [AppController],
  providers: [AppService, CategoriesService, ProductsService, UsersService],
})
export class AppModule {}

