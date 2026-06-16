import { Response } from "express";
import {
  AddCartItemSchema,
  UpdateCartItemSchema,
} from "../types/cart.types.js";
import { AuthRequest } from "../types/express.js";
import * as cartService from "../services/cartService.js";
import { AppError } from "../utils/AppError.js";

export const addToCart = async (req: AuthRequest, res: Response) => {
  const cartItemToAdd = AddCartItemSchema.parse(req.body);
  const user = req.user;
  if (!user) {
    throw new AppError("Authentication failed: User context missing.", 401);
  }
  const cartItem = await cartService.addToCart(user.id, cartItemToAdd);
  res.status(201).json({
    message: "Item added to the cart.",
    cartItem,
  });
};

export const updateCartItem = async (req: AuthRequest, res: Response) => {
  const cartItemToUpdate = UpdateCartItemSchema.parse(req.body);
  const user = req.user;
  if (!user) {
    throw new AppError("Authentication failed: User context missing.", 401);
  }
  const updatedCartItem = await cartService.updateCartItem(
    user.id,
    cartItemToUpdate,
  );
  res.status(200).json({
    message: "Cart item updated.",
    updatedCartItem,
  });
};

export const deleteCartItem = async (req: AuthRequest, res: Response) => {
  const { id: cartItemId } = req.params;
  const user = req.user;
  if (!user) {
    throw new AppError("Authentication failed: User context missing.", 401);
  }
  const deletedCartItem = await cartService.deleteCartItemById(
    cartItemId.toString(),
    user.id,
  );
  res.status(200).json({
    message: "Cart Item Deleted.",
    deletedCartItem,
  });
};
