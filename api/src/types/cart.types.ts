import z from "zod";
import { Prisma } from "@prisma/client";

export const AddCartItemSchema = z.object({
  quantity: z.coerce.number().int().positive(),
  productId: z.string().length(36, "Product ID must be exactly 36 characters"),
});

export type AddCartItem = z.infer<typeof AddCartItemSchema>;

export const UpdateCartItemSchema = z.object({
  quantity: z.coerce.number().int().positive(),
  productId: z.string().length(36, "Product ID must be exactly 36 characters"),
});

export type UpdateCartItem = z.infer<typeof UpdateCartItemSchema>;


// 1. Define the exact 'include' shape you used in your repository/service
const cartWithItemsQuery = {
  include: {
    items: {
      include: {
        product: true,
      },
    },
  },
} satisfies Prisma.CartDefaultArgs;

// 2. Feed that shape into CartGetPayload to extract the type
export type FullCartDetails = Prisma.CartGetPayload<typeof cartWithItemsQuery>;