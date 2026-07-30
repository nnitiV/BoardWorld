import { Prisma } from "@prisma/client";
import { prisma } from "../config/db.js";
import { AddOrderItem, UpdateOrderItem } from "../types/order.types.js";
import { FullCartDetails } from "../types/cart.types.js";

export const getOrderByUserIdAndOrderId = async (
  userId: string,
  orderId: string,
  tx?: Prisma.TransactionClient,
) => {
  const client = tx || prisma;
  return await client.order.findUnique({
    where: { userId, id: orderId },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });
};

export const getOrdersByUserId = async (
  userId: string,
  tx?: Prisma.TransactionClient,
) => {
  const client = tx || prisma;
  return await client.order.findMany({
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


export const createOrderFromCart = async (
  cart: FullCartDetails, 
  userId: string, 
  url: string
) => {
  // $transaction guarantees ALL of this succeeds, or NONE of it does
  return await prisma.$transaction(async (tx) => {
    // 1. Create the Order & OrderItems
    const order = await tx.order.create({
      data: {
        userId,
        paymentUrl: url,
        status: "PENDING",
        items: {
          create: cart.items.map((cartItem) => ({
            productId: cartItem.productId,
            quantity: cartItem.quantity,
          })),
        },
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    // 2. Decrement stock for every product using atomic Promise.all
    await Promise.all(
      cart.items.map((cartItem) =>
        tx.product.update({
          where: { id: cartItem.productId },
          data: {
            stock: {
              decrement: cartItem.quantity, // Atomic decrement!
            },
          },
        })
      )
    );

    return order;
  });
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
  orderId: string,
  tx?: Prisma.TransactionClient,
) => {
  const client = tx || prisma;
  return await client.orderItem.upsert({
    where: {
      orderId_productId: {
        orderId: orderId,
        productId: data.productId,
      },
    },
    update: { quantity: { increment: data.quantity } },
    create: { orderId: orderId, ...data },
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

export const updateOrderWithCheckoutUrl = async (url: string, orderId: string, tx?: Prisma.TransactionClient) => {
  const client = tx || prisma;
  return await client.order.update({
    where: {
      id: orderId,
    },
    data: { paymentUrl: url },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });
}

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

export const cancelOrder = async (orderId: string, userId: string,
  tx?: Prisma.TransactionClient,
) => {
  const client = tx || prisma;
  return await client.$transaction(async (tx) => {
    const canceledOrder = await tx.order.update({
      where: { id: orderId },
      data: { status: "CANCELED" },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    await Promise.all(
      canceledOrder.items.map((orderItem) =>
        tx.product.update({
          where: { id: orderItem.productId },
          data: { stock: { increment: orderItem.quantity } },
        }),
      ),
    );

    return canceledOrder;
  });
}