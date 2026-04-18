
import { Stock } from "../entities/stock.entity";
export interface StockRepository {
  addStock(stock: Stock): Promise<void>
  findByProductId(product_id: string): Promise<Stock | null>
}