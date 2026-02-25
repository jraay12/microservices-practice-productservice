import { z } from "zod";

export const ProductResponseSchema = z.object({
  id: z.string(),
  sku: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  price: z.number(),
  costPrice: z.number().nullable(),
  currency: z.string(),
  isActive: z.boolean(),
  createdBy: z.string(),
  updatedBy: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});


export type ProductResponseDTO = z.infer<typeof ProductResponseSchema>;