import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Status } from "../product.service";
import { Quotation } from "src/quotation/entities/quotation.entity";

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

    @OneToMany(() => Quotation, quotation => quotation.product)
    quotations: Quotation[];

    constructor(product: Partial<Product>) {
        Object.assign(this, product);
    }
}
