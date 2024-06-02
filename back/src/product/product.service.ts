import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { EntityManager, Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private productsRepository: Repository<Product>,
        private readonly entityManager: EntityManager
    ) { }
    async create(createProductDto: CreateProductDto) {
        const product = new Product(createProductDto);
        await this.entityManager.save(product);
    }

    async findAll() {
        return await this.productsRepository.find();
    }

    async findOne(id: number) {
        return await this.productsRepository.findOneBy({ id });
    }

    async update(id: number, updateProductDto: UpdateProductDto) {
        await this.productsRepository.update({ id }, updateProductDto);
        return updateProductDto;
    }

    remove(id: number) {
        return `This action removes a #${id} product`;
    }
}

export enum Status {
    available = "In Stock",
    unavailable = "Out of Stock"
}
