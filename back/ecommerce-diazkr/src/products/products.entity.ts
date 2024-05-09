import { Category } from "../categories/categories.entity";
import { OrderDetail } from "../ordersDetails/ordersDetails.entity";
import { Column, Entity, ManyToMany,PrimaryGeneratedColumn, ManyToOne } from "typeorm";


@Entity({
    name: 'products',
})

export class Product {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'text',
        nullable: false
    })
    name: string;

    @Column({
        type: 'text',
        nullable: false
    })
    description: string;

    @Column({
        type: 'decimal',
        precision:10,
        scale:2,
        nullable: false
    })
    price: number;

    @Column({
        type: 'int',
        nullable: false
    })
    stock: number;

    @Column({
        type: 'text',
        default: 'https://i.pinimg.com/564x/79/ca/3a/79ca3aeb01571e10c4dab9a6dedafb0e.jpg'
    })
    imgUrl: string;

    @ManyToOne(()=> Category, category=> category.products)
    category: Category;


    @ManyToMany(()=>OrderDetail, ordersDetail => ordersDetail.products)
    orderDetails: OrderDetail[]

}