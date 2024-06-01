import { CreateProductDTO } from "./create-product.dto";
import { PartialType } from "@nestjs/mapped-types";

export class UpdateProductDTO extends PartialType(CreateProductDTO) { }
