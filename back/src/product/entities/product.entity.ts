import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"
import { Status } from "../product.service";

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
