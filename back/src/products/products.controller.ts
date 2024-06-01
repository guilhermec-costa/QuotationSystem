import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, ValidationPipe } from '@nestjs/common';
import { ProductsService, Product, Status } from './products.service';
import { CreateProductDTO } from './dto/create-product.dto';
import { UpdateProductDTO } from './dto/update-product.dto';

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
    public async create(@Body(ValidationPipe) createProductDto: CreateProductDTO): Promise<Product> {
        return this.productService.create(createProductDto);
    }

    @Patch(":id")
    public async update(@Param("id", ParseIntPipe) id: number, @Body(ValidationPipe) updateProductDTO: UpdateProductDTO): Promise<UpdateProductDTO> {
        return await this.productService.update(id, updateProductDTO);
    }

    @Delete(":id")
    public async delete(@Param("id", ParseIntPipe) id: number): Promise<Product> {
        return await this.productService.delete(id);
    }

}
