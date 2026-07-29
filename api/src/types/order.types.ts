import z from "zod";

export const AddOrderItemSchema = z.object({
  quantity: z.coerce.number().int().positive(),
  productId: z.string().length(36, "Product ID must be exactly 36 characters"),
});

export type AddOrderItem = z.infer<typeof AddOrderItemSchema>;

export const UpdateOrderItemSchema = z.object({
  quantity: z.coerce.number().int().positive(),
  productId: z.string().length(36, "Product ID must be exactly 36 characters"),
});

export type UpdateOrderItem = z.infer<typeof UpdateOrderItemSchema>;

