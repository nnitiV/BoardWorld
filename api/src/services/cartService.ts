import { prisma } from "../config/db.js";
import * as cartRepository from "../repository/cartRepository.js";
import { AddCartItem, UpdateCartItem } from "../types/cart.types.js";

export const addToCart = async (userId: string, cartItem: AddCartItem) => {
  return await prisma.$transaction(async (tx) => {
    let cart = await cartRepository.getCartByUserId(userId, tx);
    if (!cart) {
      cart = await cartRepository.createCart(userId, tx);
    }
    let newCartItem = await cartRepository.addItemToCart(cartItem, cart.id, tx);

    return newCartItem;
  });
};

export const updateCartItem = async (
  userId: string,
  cartItemToUpdate: UpdateCartItem,
) => {
  const updatedCartItem = await cartRepository.updateCartItem(
    userId,
    cartItemToUpdate,
  );
  return updatedCartItem;
};

export const deleteCartItemById = async (id: string) => {
    const deletedCartItem = await cartRepository.deleteCartItemById(id);
    return deletedCartItem;
}