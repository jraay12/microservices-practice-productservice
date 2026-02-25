import { z } from "zod";

export const CreateProductSchema = z.object({
  sku: z.string().min(1, "SKU is required"),
  name: z.string().min(1, "Product name is required"),
  description: z.string().optional().nullable(),
  price: z.number().positive("Price must be greater than 0"),
  costPrice: z
    .number()
    .nonnegative("Cost price cannot be negative")
    .optional()
    .nullable(),
  currency: z.string().optional().default("PHP"),
  isActive: z.boolean().optional().default(true),
  updatedBy: z.string().optional().nullable(),
  createdBy: z.string().optional(),
});

// 2️⃣ TypeScript type for DTO
export type CreateProductDTO = z.infer<typeof CreateProductSchema>;
