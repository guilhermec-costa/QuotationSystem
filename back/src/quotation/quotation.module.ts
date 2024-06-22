import { Module } from '@nestjs/common';
import { QuotationService } from './quotation.service';
import { QuotationController } from './quotation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quotation } from './entities/quotation.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Quotation])
    ],
    controllers: [QuotationController],
    providers: [QuotationService],
})
export class QuotationModule { }
