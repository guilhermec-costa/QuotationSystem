import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ProductsService, Product, Status } from './products.service';

@Controller('products')
export class ProductsController {
    // Products CRUD
    constructor(private readonly productService: ProductsService) { }

    @Get() //   /api/products
    public findAll(@Query("status") status?: Status): Product[] {
        return this.productService.findAll(status);
    }

    @Get(":id") //   /api/products/id
    public async findOne(@Param("id", ParseIntPipe) id: number): Promise<Product> {
        return await this.productService.findOne(id);
    }

    @Post()
    public async create(@Body() product: Product): Promise<Product> {
        return this.productService.create(product);
    }

    @Patch(":id")
    public async update(@Param("id", ParseIntPipe) id: number, @Body() product: Product): Promise<Product> {
        return await this.productService.update(id, product);
    }

    @Delete(":id")
    public async delete(@Param("id", ParseIntPipe) id: number): Promise<Product> {
        return await this.productService.delete(id);
    }

}
