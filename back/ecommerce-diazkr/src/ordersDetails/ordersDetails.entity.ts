import { Order } from "../orders/orders.entity";
import { Product } from "../products/products.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity({
    name: 'ordersDetails',
})

export class OrderDetail {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'decimal',
        precision: 10,
        scale: 2
    })
    price: number;

    @ManyToMany(()=>Product, product => product.orderDetails)
    @JoinTable({
        name:'orderDetails_products'
    })
    products: Product[]

    @OneToOne(()=> Order, order=> order.orderDetail)
    @JoinColumn()
    order: Order;


}