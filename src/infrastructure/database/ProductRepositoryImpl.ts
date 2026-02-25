import { Product } from "../../domain/entities/product.entity";
import { ProductRepository } from "../../domain/ports/product.repository";
import { PrismaClient } from "@prisma/client";
export class ProductRepositoryImpl implements ProductRepository {
  constructor(private prisma: PrismaClient) {}

  async create(product: Product): Promise<Product> {
    const data = await this.prisma.product.create({
      data: {
        ...product.toJSON(),
        price: product.price,
        costPrice: product.costPrice ?? null,
      },
    });

    return Product.hydrate({
      ...data,
      price: Number(data.price),
      costPrice: data.costPrice != null ? Number(data.costPrice) : null,
    });
  }
}
