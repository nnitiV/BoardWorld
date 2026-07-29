import { Prisma } from "@prisma/client";
import { prisma } from "../config/db.js";
import { AddOrderItem, UpdateOrderItem } from "../types/order.types.js";

export const getOrderByUserId = async (
  userId: string,
  tx?: Prisma.TransactionClient,
) => {
  const client = tx || prisma;
  return await client.order.findUnique({
    where: { userId },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });
};

export const getOrderItemsByOrderId = async (
  orderId: string,
  tx?: Prisma.TransactionClient,
) => {
  const client = tx || prisma;
  return await client.orderItem.findMany({ where: { orderId } });
};

export const createOrder = async (
  userId: string,
  tx?: Prisma.TransactionClient,
) => {
  const client = tx || prisma;
  return await client.order.create({ data: { userId } });
};

export const getOrderItemByProductOrderId = async (
  productId: string,
  orderId: string,
  tx?: Prisma.TransactionClient,
) => {
  const client = tx || prisma;
  return await client.orderItem.findUnique({
    where: { orderId_productId: { productId, orderId } },
  });
};

export const addItemToOrder = async (
  data: AddOrderItem,
  OrderId: string,
  tx?: Prisma.TransactionClient,
) => {
  const client = tx || prisma;
  return await client.orderItem.upsert({
    where: {
      orderId_productId: {
        orderId: OrderId,
        productId: data.productId,
      },
    },
    update: { quantity: { increment: data.quantity } },
    create: { orderId: OrderId, ...data },
    include: { product: true }
  });
};

export const updateOrderItem = async (
  orderId: string,
  data: UpdateOrderItem,
  tx?: Prisma.TransactionClient,
) => {
  const client = tx || prisma;
  return await client.orderItem.update({
    where: {
      orderId_productId: { orderId, productId: data.productId },
    },
    data: { ...data, orderId },
    include: { product: true },
  });
};

export const deleteOrderItemById = async (
  id: string,
  OrderId: string,
  tx?: Prisma.TransactionClient,
) => {
  const client = tx || prisma;
  return await client.orderItem.deleteMany({
    where: { id, OrderId },
  });
};
