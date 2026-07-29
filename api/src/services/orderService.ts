import { prisma } from "../config/db.js";
import * as orderRepository from "../repository/orderRepository.js"
import { AddOrderItem, UpdateOrderItem } from "../types/order.types.js";
import { AppError } from "../utils/AppError.js";

export const getOrderByUserId = async (userId: string) => {
  const Order = await orderRepository.getOrderByUserId(userId);
  if (!Order) {
    return { id: "", items: [] };
  }
  return Order;
};

export const addToOrder = async (userId: string, OrderItem: AddOrderItem) => {
  return await prisma.$transaction(async (tx) => {
    let Order = await orderRepository.getOrderByUserId(userId, tx);
    
    let OrderId = !Order
      ? (await orderRepository.createOrder(userId, tx)).id
      : Order.id;

    const newOrderItem = await orderRepository.addItemToOrder(
      OrderItem,
      OrderId,
      tx,
    );

    return newOrderItem;
  });
};

export const updateOrderItem = async (
  userId: string,
  OrderItemToUpdate: UpdateOrderItem,
) => {
  return await prisma.$transaction(async (tx) => {
    let Order = await orderRepository.getOrderByUserId(userId, tx);
    if (!Order) {
      throw new AppError("No Order associated with this user.", 404);
    }
    const updatedOrderItem = await orderRepository.updateOrderItem(
      Order.id,
      OrderItemToUpdate,
      tx,
    );
    return updatedOrderItem; 
  });
};

export const deleteOrderItemById = async (
  OrderItemId: string,
  userId: string,
) => {
  return await prisma.$transaction(async (tx) => {
    let Order = await orderRepository.getOrderByUserId(userId, tx);
    if (!Order) {
      throw new AppError("No Order associated with this user.", 404);
    }
    const deletedOrderItem = await orderRepository.deleteOrderItemById(
      OrderItemId,
      Order.id,
      tx,
    );
    return deletedOrderItem;
  });
};
