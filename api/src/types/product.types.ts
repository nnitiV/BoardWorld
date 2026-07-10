import z from "zod";

export const UpdateProductSchema = z.object({
  name: z.string(),
  price: z.coerce.number().positive("Price must be a positive number"),
  description: z.string().max(2500, "Description must be at most 2500 characters"),
  categoryId: z.uuid(),
  stock: z.coerce.number().int().min(0, "Stock cannot be negative"),
  imagesUrl: z.string().nullable().transform((val) => val ? val.split(",") : []),
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
  description: z.string().max(2500, "Description must be at most 2500 characters"),
  categoryId: z.uuid("Category ID must be a valid UUID"),
  stock: z.coerce.number().int().min(0, "Stock cannot be negative"),
});

export const CreateCategorySchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
});

export type CreateCategory = z.infer<typeof CreateCategorySchema>;

export const CreateReviewSchema = z.object({
  rating: z.coerce.number().int().min(1, "Rating must be at least 1").max(5, "Rating cannot exceed 5"),
  comment: z.string().max(500, "Comment must be at most 500 characters").optional(),
});

export type CreateReview = z.infer<typeof CreateReviewSchema>;