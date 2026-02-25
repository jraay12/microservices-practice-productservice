import { Request, Response } from "express";
import {
  CreateProductDTO,
  CreateProductSchema,
} from "../../application/dto/create-product.dto";
import { ZodError } from "zod";
import { CreateProductUsecase } from "../../application/usecases/create-product.usecase";

export class ProductController {
  constructor(private createProductUsecase: CreateProductUsecase) {}

  create = async (req: Request, res: Response) => {
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
      if (error instanceof ZodError) {
        return res.status(400).json({ errors: error.flatten() });
      }

      console.error("Create product error:", error);
      return res.status(500).json({
        message: "Internal server error",
        error: error.message ?? "Unknown error",
      });
    }
  };
}
