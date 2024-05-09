import { Injectable, NotFoundException } from '@nestjs/common';
import { Order } from './orders.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Or, Repository } from 'typeorm';
import { User } from '../users/users.entity';
import { Product } from '../products/products.entity';
import { OrderDetail } from '../ordersDetails/ordersDetails.entity';
import { orderdDto } from '../Dto/oder.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private ordersRepository: Repository<Order>,
    @InjectRepository(User) private usersRepository: Repository<User>,
    @InjectRepository(Product) private productsRepository: Repository<Product>,
    @InjectRepository(OrderDetail)
    private ordersDetailRepository: Repository<OrderDetail>,
  ) {}

  async addOrder(orderData: orderdDto) {
    const { userId, products } = orderData;

    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if(!user){
      throw new NotFoundException(`No se encontró  con ese id`)
    }

    //Crear un registro en orders
    const order = new Order();
    order.date = new Date().toISOString();
    order.user = user;

    //Buscar productos por ID
    const productIds = products.map((product) => product.id);
    const allProducts = await this.productsRepository.find({
      where: { id: In(productIds) },
    });

    const notFoundProductIds: string[] = [];
    products.forEach((product) => {
        if (!allProducts.find((p) => p.id === product.id)) {
            notFoundProductIds.push(product.id);
        }
    });

    if (notFoundProductIds.length > 0) {
        throw new NotFoundException(`No se encontraron los siguientes productos: ${notFoundProductIds.join(', ')}`);
    }

    //Verificar las que sean mayor de cero
    const toBuy = allProducts.filter((product) => product.stock > 0);

    //Crear registro en la tabla orderDetail
    const orderDetail = new OrderDetail();
    orderDetail.products = toBuy;
    orderDetail.order = order;
    orderDetail.price = toBuy.reduce(
      (acumulado, actual) => acumulado + Number(actual.price),
      0,
    );

    ///Guardar e order details
    order.orderDetail = orderDetail;
    const savedOrder = await this.ordersRepository.save(order);
    const savedOrderDetails = await this.ordersDetailRepository.save(orderDetail);

    //Actualizar el producto en stock

    await Promise.all(
      toBuy.map(async (product) => {
        product.stock -= 1;
        await this.productsRepository.save(product);
      }),
    );

    return await this.ordersRepository.find({
      where: {id: order.id},
      relations:{
        orderDetail: true,
      },
    });
  }

  

  async getOrder(id:string) {
    const order = await this.ordersRepository.findOne({
      where:{id},
      relations:{
        orderDetail:{
          products:true
        },
      },
    });

    if (!order) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }

    return order;
  }
  
}

