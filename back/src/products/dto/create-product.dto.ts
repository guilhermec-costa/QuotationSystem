import { Status } from "../products.service"
import { IsString, IsNumber, IsEnum } from "class-validator"

export class CreateProductDTO {
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
