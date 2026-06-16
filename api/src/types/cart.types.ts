import z from "zod";

export const AddCartItemSchema = z.object({
  quantity: z.coerce.number().int().positive(),
  productId: z.string().length(36, "Product ID must be exactly 36 characters"),
});

export type AddCartItem = z.infer<typeof AddCartItemSchema>;
