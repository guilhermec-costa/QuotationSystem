import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Sse } from '@nestjs/common';
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
    public findAll(@Query("status") status?: Status): Product[] {
        console.log(status);
        return [];
    }

    @Get(":id") //   /api/products/id
    public async findOne(@Param("id") id: number): Promise<number> {
        const x = 5;
        console.log(x)

        return await new Promise((resolve) => {
            setTimeout(() => resolve(id), 3000)
        })
    }

    @Post()
    public async create(@Body() product: Product): Promise<Product> {
        return product
    }

    @Patch(":id")
    public async update(@Param("id") id: number, @Body() product: Product): Promise<{ id: number } & Product> {
        return { id, ...product };
    }

    @Delete(":id")
    public async delete(@Param("id") id: number): Promise<number> {
        return id;
    }

}


