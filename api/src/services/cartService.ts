import { prisma } from "../config/db.js";
import * as cartRepository from "../repository/cartRepository.js";
import { AddCartItem, UpdateCartItem } from "../types/cart.types.js";
import { AppError } from "../utils/AppError.js";

export const getCartByUserId = async (userId: string) => {
  const cart = await cartRepository.getCartByUserId(userId);
  if (!cart) {
    return { id: "", items: [] };
  }
  return cart;
};

export const addToCart = async (userId: string, cartItem: AddCartItem) => {
  return await prisma.$transaction(async (tx) => {
    let cart = await cartRepository.getCartByUserId(userId, tx);
    
    let cartId = !cart
      ? (await cartRepository.createCart(userId, tx)).id
      : cart.id;

    const newCartItem = await cartRepository.addItemToCart(
      cartItem,
      cartId,
      tx,
    );

    return newCartItem;
  });
};

export const updateCartItem = async (
  userId: string,
  cartItemToUpdate: UpdateCartItem,
) => {
  return await prisma.$transaction(async (tx) => {
    let cart = await cartRepository.getCartByUserId(userId, tx);
    if (!cart) {
      throw new AppError("No cart associated with this user.", 404);
    }
    const updatedCartItem = await cartRepository.updateCartItem(
      userId,
      cart.id,
      cartItemToUpdate,
      tx,
    );
    return updatedCartItem; 
  });
};

export const deleteCartItemById = async (
  cartItemId: string,
  userId: string,
) => {
  return await prisma.$transaction(async (tx) => {
    let cart = await cartRepository.getCartByUserId(userId, tx);
    if (!cart) {
      throw new AppError("No cart associated with this user.", 404);
    }
    const deletedCartItem = await cartRepository.deleteCartItemById(
      cartItemId,
      cart.id,
      tx,
    );
    return deletedCartItem;
  });
};
