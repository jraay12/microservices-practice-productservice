import { PrismaClient } from "@prisma/client";
import { Stock } from "../../domain/entities/stock.entity";
import { StockRepository } from "../../domain/ports/stock.repository";

export class StockRepositoryImpl implements StockRepository {
  constructor(private prisma: PrismaClient) {}

  async addStock(stock: Stock): Promise<void> {
    await this.prisma.stock.update({
      where: {
        productId: stock.productId,
      },
      data: {
        quantity: stock.quantity,
      },
    });
  }

  async findByProductId(product_id: string): Promise<Stock | null> {
    const stock = await this.prisma.stock.findUnique({
      where: {
        productId: product_id,
      },
    });

    if (!stock) return null;

    return Stock.hydrate(stock);
  }
}
