import { Product } from "../entities/product.entity";

export interface ProductRepository {
  create(product: Product): Promise<Product>;
  findBySku(sku: string): Promise<Product | null>
}
