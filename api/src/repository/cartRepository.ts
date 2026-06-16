import { Prisma } from "@prisma/client";
import { prisma } from "../config/db.js";
import { AddCartItem, UpdateCartItem } from "../types/cart.types.js";

export const getCartByUserId = async (
  userId: string,
  tx?: Prisma.TransactionClient,
) => {
  const client = tx || prisma;
  return await client.cart.findUnique({ where: { userId } });
};

export const createCart = async (
  userId: string,
  tx?: Prisma.TransactionClient,
) => {
  const client = tx || prisma;
  return await client.cart.create({ data: { userId } });
};

export const getCartItemByProductCartId = async (
  productId: string,
  cartId: string,
  tx?: Prisma.TransactionClient,
) => {
  const client = tx || prisma;
  return await client.cartItem.findUnique({
    where: { cartId_productId: { productId, cartId } },
  });
};

export const addItemToCart = async (
  data: AddCartItem,
  cartId: string,
  tx?: Prisma.TransactionClient,
) => {
  const client = tx || prisma;
  return await client.cartItem.upsert({
    where: {
      cartId_productId: {
        cartId: cartId,
        productId: data.productId,
      },
    },
    update: { quantity: { increment: data.quantity } },
    create: { cartId: cartId, ...data },
  });
};

export const updateCartItem = async (
  userId: string,
  cartId: string,
  data: UpdateCartItem,
  tx?: Prisma.TransactionClient,
) => {
  const client = tx || prisma;
  return await client.cartItem.update({
    where: {
      cartId_productId: { cartId: cartId, productId: data.productId },
    },
    data: { ...data, cartId },
  });
};

export const deleteCartItemById = async (
  id: string,
  cartId: string,
  tx?: Prisma.TransactionClient,
) => {
  const client = tx || prisma;
  return await client.cartItem.deleteMany({
    where: { id, cartId },
  });
};
