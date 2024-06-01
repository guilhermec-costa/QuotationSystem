import { Status } from "src/products/products.service"
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Product {

    @PrimaryGeneratedColumn("identity")
    id: number;

    @Column()
    name: string

    @Column()
    description: string

    @Column()
    price: number

    @Column()
    status: Status

    @Column()
    quantity: number

    constructor(product: Partial<Product>) {
        Object.assign(this, product);
    }
}
