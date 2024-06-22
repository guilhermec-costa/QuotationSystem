import { Product } from "src/product/entities/product.entity"
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Quotation {

    @PrimaryGeneratedColumn("identity")
    id: number;

    @ManyToOne(() => Product, product => product.quotations, { nullable: false })
    product: Product;

    @Column()
    price: number;
}
