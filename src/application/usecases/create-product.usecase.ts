import { Product } from "../../domain/entities/product.entity";
import { ProductRepository } from "../../domain/ports/product.repository";
import { ProductResponseDTO } from "../dto/create-product-response.dto";
import { CreateProductDTO } from "../dto/create-product.dto";

export class CreateProductUsecase {
  constructor(private productRepo: ProductRepository) {}

  async execute(data: CreateProductDTO): Promise<ProductResponseDTO> {
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
