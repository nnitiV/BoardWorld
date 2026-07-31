import * as paymentService from "../services/paymentService.js";
import * as orderService from "../services/orderService.js";
import { AuthRequest } from "../types/express.js";
import { AppError } from "../utils/AppError.js";
import { Response } from "express";

export const getOrders = async (req: AuthRequest, res: Response) => {
  const userId = req.user?.id;
  if (!userId) {
    throw new AppError("Authentication failed: User context missing.", 401);
  }
  const orders =
    await paymentService.getOrders(userId);
  res.status(200).json({
    message: "Checkout session created",
    orders
  });
}

export const createCheckout = async (req: AuthRequest, res: Response) => {
  const userId = req.user?.id;
  if (!userId) {
    throw new AppError("Authentication failed: User context missing.", 401);
  }
  const { order, checkoutSession } =
    await paymentService.createCheckout(userId);
  res.status(200).json({
    message: "Checkout session created",
    checkout: checkoutSession,
    order,
  });
};

export const cancelOrder = async (req: AuthRequest, res: Response) =>{
  const userId = req.user?.id;
  if (!userId) {
    throw new AppError("Authentication failed: User context missing.", 401);
  }
  const { id } = req.params;
  if(!id) {
    throw new AppError("Please provide a valid order id.", 400);
  }
  const canceledOrder = await orderService.cancelOrder(id, userId);
  res.status(200).json({
    message: "Order canceled",
    canceledOrder
  });
}