
import { Product } from "../products/products.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity({
    name: 'categories',
})

export class Category {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'varchar',
        unique: true
    })
    name: string;

    @OneToMany(()=> Product, product => product.category)
    products: Product[];
}

