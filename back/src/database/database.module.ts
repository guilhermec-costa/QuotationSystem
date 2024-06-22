import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Product } from 'src/product/entities/product.entity';
import { Quotation } from 'src/quotation/entities/quotation.entity';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useFactory: (configSevice: ConfigService) => ({
                type: "postgres",
                host: "localhost",
                port: 5434,
                database: "postgres",
                username: "postgres",
                password: "admin",
                entities: [Product, Quotation],
                autoLoadEntities: true,
                synchronize: true
            }),
            inject: [ConfigService]
        })
    ],
    providers: [DatabaseService],
    exports: [DatabaseService]
})
export class DatabaseModule { }
