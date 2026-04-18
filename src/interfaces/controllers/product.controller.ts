import { NextFunction, Request, Response } from "express";
import {
  CreateProductDTO,
  CreateProductSchema,
} from "../../application/dto/create-product.dto";
import { ZodError } from "zod";
import { CreateProductUsecase } from "../../application/usecases/create-product.usecase";

export class ProductController {
  constructor(private createProductUsecase: CreateProductUsecase) {}

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user_id = req.user!.id;
      const dto: CreateProductDTO = CreateProductSchema.parse(req.body);

      dto.createdBy = user_id;
     

      const result = await this.createProductUsecase.execute(dto);

      return res.status(201).json({
        message: "Product successfully created",
        data: result,
      });
    } catch (error: any) {
      next(error)
     
    }
  };
}
