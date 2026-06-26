import z from "zod";

export const UpdateProductSchema = z.object({
  name: z.string(),
  price: z.coerce.number().positive("Price must be a positive number"),
  stock: z.coerce.number().int().min(0, "Stock cannot be negative"),
  imageUrl: z.string().nullable(),
  isActive: z.enum(["true", "false"]).transform((val) => val === "true"),
});

export type UpdateProduct = z.infer<typeof UpdateProductSchema>;

export const ProductCatalogRequestSchema = z.object({
  page: z.coerce.number(),
  limit: z.coerce.number(),
});

export const CreateProductSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  price: z.coerce.number().positive("Price must be a positive number"),
  stock: z.coerce.number().positive("Price must be a positive number"),
});