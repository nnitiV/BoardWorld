import { Prisma } from "@prisma/client";
import { prisma } from "../config/db.js";
import { UpdateProduct } from "../types/product.types.js";

export const getProductById = async (id: string) => {
  return await prisma.product.findUnique({ where: { id } });
};

export const getProductCatalog = async (
  skip: number,
  limit: number,
  tx?: Prisma.TransactionClient,
) => {
  const client = tx || prisma;
  return {
    products: await client.product.findMany({
      select: {
        id: true,
        name: true,
        imageUrl: true,
        price: true,
        stock: true,
        isActive: true,
      },
      take: limit,
      skip: skip,
    }),
    totalItems: await client.product.count(),
  };
};

export const getActiveProductCatalog = async (
  skip: number,
  limit: number,
  tx?: Prisma.TransactionClient,
) => {
  const client = tx || prisma;
  return {
    products: await client.product.findMany({
      where: {
        isActive: true,
        stock: {
          gt: 0,
        },
      },
      select: {
        id: true,
        name: true,
        imageUrl: true,
        price: true,
        stock: true,
        isActive: true,
      },
      take: limit,
      skip: skip,
    }),
    totalItems: await client.product.count(),
  };
};

export const createProduct = async (
  data: Prisma.ProductCreateInput,
  tx?: Prisma.TransactionClient,
) => {
  const client = tx || prisma;
  return await client.product.create({
    data: {
      ...data,
      stock: data.stock,
    },
  });
};

export const updateProduct = async (
  id: string,
  data: UpdateProduct,
  imageUrl: string,
  tx?: Prisma.TransactionClient,
) => {
  const client = tx || prisma;
  return await client.product.update({
    where: { id },
    data: {
      ...data,
      imageUrl,
    },
  });
};

export const restoreProduct = async (
  id: string,
  tx?: Prisma.TransactionClient,
) => {
  const client = tx || prisma;
  return await client.product.update({
    where: { id },
    data: { isActive: true },
  });
};

export const deactivateProduct = async (
  id: string,
  tx?: Prisma.TransactionClient,
) => {
  const client = tx || prisma;
  return await client.product.update({
    where: { id },
    data: { isActive: false },
  });
};
