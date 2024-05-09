import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../users/users.entity";
import { OrderDetail } from "../ordersDetails/ordersDetails.entity";


@Entity({
    name: 'orders',
})

export class Order {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    date: string;

    @ManyToOne(()=>User, user => user.orders)
    user: User;

    @OneToOne(()=>OrderDetail, OrderDetail=> OrderDetail.order)
    orderDetail: OrderDetail;


}