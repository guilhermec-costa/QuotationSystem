import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDTO } from './dto/create-product.dto';
import { UpdateProductDTO } from './dto/update-product.dto';

export enum Status {
    available = "In Stock",
    unavailable = "Out of Stock"
}

export interface Product {
    id: number,
    name: string,
    description: string,
    price: number,
    status: Status,
    quantity: number
}

@Injectable()
export class ProductsService {
    private data: CreateProductDTO[] = [
        {
            id: 1,
            name: "Keyboard",
            description: "A mechanical keyboard",
            price: 100,
            quantity: 5,
            status: Status.available
        },
        {
            id: 2,
            name: "Mouse",
            description: "A wireless mouse",
            price: 50,
            quantity: 0,
            status: Status.unavailable
        },
        {
            id: 3,
            name: "Monitor",
            description: "A 24-inch monitor",
            price: 200,
            quantity: 3,
            status: Status.available
        },
        {
            id: 4,
            name: "USB Cable",
            description: "A 2-meter USB-C cable",
            price: 15,
            quantity: 0,
            status: Status.unavailable
        },
        {
            id: 5,
            name: "Laptop",
            description: "A 15-inch laptop",
            price: 1500,
            quantity: 2,
            status: Status.available
        },
        {
            id: 6,
            name: "Desk Lamp",
            description: "An adjustable desk lamp",
            price: 30,
            quantity: 0,
            status: Status.unavailable
        },
        {
            id: 7,
            name: "Headphones",
            description: "Noise-canceling headphones",
            price: 120,
            quantity: 7,
            status: Status.available
        },
        {
            id: 8,
            name: "Mouse Pad",
            description: "A large mouse pad",
            price: 10,
            quantity: 0,
            status: Status.unavailable
        },
        {
            id: 9,
            name: "Webcam",
            description: "A 1080p webcam",
            price: 70,
            quantity: 8,
            status: Status.available
        },
        {
            id: 10,
            name: "Smartphone",
            description: "A latest model smartphone",
            price: 800,
            quantity: 4,
            status: Status.unavailable
        },
        {
            id: 11,
            name: "Tablet",
            description: "A 10-inch tablet",
            price: 600,
            quantity: 0,
            status: Status.available
        },
        {
            id: 12,
            name: "Charger",
            description: "A fast charger",
            price: 25,
            quantity: 30,
            status: Status.unavailable
        },
        {
            id: 13,
            name: "Printer",
            description: "A color printer",
            price: 250,
            quantity: 1,
            status: Status.available
        },
        {
            id: 14,
            name: "Speakers",
            description: "Bluetooth speakers",
            price: 80,
            quantity: 12,
            status: Status.unavailable
        },
        {
            id: 15,
            name: "External Hard Drive",
            description: "1TB external hard drive",
            price: 100,
            quantity: 0,
            status: Status.available
        }
    ];

    public findAll(status?: Status): Product[] {
        if (status) return this.data.filter(product => product.status === status);
        return this.data;
    }

    public async findOne(id: number): Promise<Product> {
        const product = this.data.find(product => product.id === id);
        if (!product) throw new NotFoundException();
        return product;
    }

    public async create(createProductDto: CreateProductDTO): Promise<Product> {
        this.data.push(createProductDto);
        return createProductDto;
    }

    public async update(id: number, updateProductDto: UpdateProductDTO): Promise<UpdateProductDTO> {
        this.data = this.data.map(product => {
            if (product.id === id) {
                return { ...product, ...updateProductDto }
            }

            return product;
        })

        return updateProductDto;
    }

    public async delete(id: number): Promise<Product> {
        const removedProduct = await this.findOne(id);
        this.data = this.data.filter(product => product.id !== removedProduct.id);
        return removedProduct;
    }
}
