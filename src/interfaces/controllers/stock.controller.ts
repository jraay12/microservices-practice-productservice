import { AddStockDTO, AddStockSchema } from "../../application/dto/add-stock.dto";
import { AddStockUsecase } from "../../application/usecases/add-stock.usecase";
import { Request, Response, NextFunction } from "express";
export class StockController {
  constructor(private addStockUsecase: AddStockUsecase){}

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const inputParams = req.params as {product_id: string}
      const dto: AddStockDTO = AddStockSchema.parse(req.body);
      const result = await this.addStockUsecase.execute(dto, inputParams.product_id)
      res.status(200).json({
        message: "Successfully added stock"
      })
    } catch (error) {
      next(error)
    }
  }
}