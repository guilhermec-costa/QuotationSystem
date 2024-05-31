import { Body, Controller, Get, Param, Post, Sse } from '@nestjs/common';
import { ProductsService } from './products.service';

enum Status {
    available = "In Stock",
    unavailable = "Out of Stock"
}

type Product = {
    id: number,
    name: string,
    description: string,
    price: number,
    status: Status,
    quantity: number
}


@Controller('products')
export class ProductsController {
    // Products CRUD
    constructor(private readonly productService: ProductsService) { }

    @Get() //   /api/products
    public findAll(): Product[] { return [] }

    @Get(":id") //   /api/products/id
    public async findOne(@Param("id") id: number): Promise<number> {
        return await new Promise((resolve) => {
            setTimeout(() => resolve(id), 3000)
        })
    }

    @Post()
    public async create(@Body() product: Product): Promise<Product> {
        return product
    }

}


