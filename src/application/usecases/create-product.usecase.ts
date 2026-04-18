import { Product } from "../../domain/entities/product.entity";
import { ProductRepository } from "../../domain/ports/product.repository";
import { BadRequestError } from "../../shared/error/BadRequestError";
import { ProductResponseDTO } from "../dto/create-product-response.dto";
import { CreateProductDTO } from "../dto/create-product.dto";

export class CreateProductUsecase {
  constructor(private productRepo: ProductRepository) {}

  async execute(data: CreateProductDTO): Promise<ProductResponseDTO> {

    const existing_sku = await this.productRepo.findBySku(data.sku)

    if(existing_sku) throw new BadRequestError("SKU already exists")
      
    const product = Product.create(data);
    const saveProduct = await this.productRepo.create(product);


    return {
      ...saveProduct.toJSON(),
      description: saveProduct.description ?? null,
      costPrice: saveProduct.costPrice ?? null,
      updatedBy: saveProduct.updatedBy ?? null,
    };
  }
}
