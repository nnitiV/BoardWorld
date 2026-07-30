import { prisma } from "../config/db.js";
import * as orderRepository from "../repository/orderRepository.js";
import { FullCartDetails } from "../types/cart.types.js";
import { AddOrderItem, UpdateOrderItem } from "../types/order.types.js";

export const createOrder = async (userId: string) => {
  const order = await orderRepository.createOrder(userId);
  return order;
};

export const createOrderFromCart = async (cart: FullCartDetails, userId: string, url: string) => {
  const order = await orderRepository.createOrderFromCart(cart, userId, url);
  return order;
}

export const getOrdersByUserId = async (userId: string) => {
  const Order = await orderRepository.getOrdersByUserId(userId);
  if (!Order) {
    return { id: "", items: [] };
  }
  return Order;
};

export const addToOrder = async (
  userId: string,
  orderId: string,
  orderItem: AddOrderItem,
) => {
  return await prisma.$transaction(async (tx) => {
    let order = await orderRepository.getOrderByUserIdAndOrderId(
      userId,
      orderId,
      tx,
    );

    let ordId = !order
      ? (await orderRepository.createOrder(userId, tx)).id
      : order.id;

    const newOrderItem = await orderRepository.addItemToOrder(
      orderItem,
      ordId,
      tx,
    );

    return newOrderItem;
  });
};

export const updateOrderItem = async (
  orderId: string,
  orderItemToUpdate: UpdateOrderItem,
) => {
  const updatedOrderItem = await orderRepository.updateOrderItem(
    orderId,
    orderItemToUpdate,
  );
  return updatedOrderItem;
};

export const updateOrderWithCheckoutUrl = async (
  url: string,
  orderId: string,
) => {
  const updatedOrder = await orderRepository.updateOrderWithCheckoutUrl(
    url,
    orderId,
  );
  return updatedOrder;
};

export const deleteOrderItemById = async (
  orderItemId: string,
  orderId: string,
) => {
  const deletedOrderItem = await orderRepository.deleteOrderItemById(
    orderItemId,
    orderId,
  );
  return deletedOrderItem;
};

export const cancelOrder = async (orderId: string, userId: string) => {
  const canceledOrder = await orderRepository.cancelOrder(orderId, userId);
  console.log(canceledOrder);
  return canceledOrder;
};
