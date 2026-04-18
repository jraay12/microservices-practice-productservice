import { ProductRepository } from "../../domain/ports/product.repository";
import { StockRepository } from "../../domain/ports/stock.repository";
import { NotFoundError } from "../../shared/error/NotFoundError";
import { AddStockDTO } from "../dto/add-stock.dto";

export class AddStockUsecase {
  constructor(private stockRepo: StockRepository, private productRepo: ProductRepository){}

  async execute(dto: AddStockDTO, product_id: string){
    const product = await this.productRepo.findById(product_id)
    if(!product) throw new NotFoundError("Product not exists")

    const existing_stock = await this.stockRepo.findByProductId(product_id)

    if(!existing_stock) throw new NotFoundError("Stock didnt exists")

    existing_stock.add(dto.quantity)

    await this.stockRepo.addStock(existing_stock)

    return existing_stock
    
  }
}