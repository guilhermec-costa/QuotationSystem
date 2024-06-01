import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { ProductModule } from './product/product.module';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        ProductsModule,
        DatabaseModule,
        ProductModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }
