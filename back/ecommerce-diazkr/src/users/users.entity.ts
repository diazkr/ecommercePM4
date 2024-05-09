import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "../orders/orders.entity";

@Entity({
    name: 'users',
})

export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type:'varchar',
        length:50,
        nullable: false
    })
    name: string;

    @Column({
        type:'varchar',
        length:50,
        nullable: false,
        unique: true
    })
    email: string;

    @Column({
        type:'varchar',
        length:200,
        nullable: false
    })
    password: string;

    @Column({
        type:'int',
        nullable: false,
    })
    phone: number;

    @Column({
        type: 'text'
    })
    country: string;

    @Column()
    address: string;

    @Column()
    city: string;

    @Column({default: 'user'})
    rol: string;

    @OneToMany(()=>Order, order => order.user)
    orders: Order[];

}