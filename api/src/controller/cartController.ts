import { Response } from "express";
import { AddCartItemSchema } from "../types/cart.types.js";
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
  res.status(200).json({
    message: "Item added to the cart.",
    cartItem,
  });
};
