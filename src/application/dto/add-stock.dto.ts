import { z } from "zod";

export const AddStockSchema = z.object({
  quantity: z.number().positive("Quantity must be greater than 0"),
});

export type AddStockDTO = z.infer<typeof AddStockSchema>;
