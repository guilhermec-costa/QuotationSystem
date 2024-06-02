import { IsEnum, IsNumber, IsString } from "class-validator"
import { Status } from "../product.service"

export class CreateProductDto {
    id: number

    @IsString()
    name: string
    description: string
    price: number

    @IsEnum(Status, {
        message: "Valid status required"
    })
    status: Status

    @IsNumber()
    quantity: number
}
