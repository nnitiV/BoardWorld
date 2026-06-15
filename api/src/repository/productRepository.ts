import { Prisma } from "@prisma/client";
import { prisma } from "../config/db.js";
import { UpdateProduct } from "../types/product.types.js";

export const getProductById = async (id: string) => {
  return await prisma.product.findUnique({ where: { id } });
};

export const createProduct = async (
  data: Prisma.ProductCreateInput,
  tx?: Prisma.TransactionClient,
) => {
  const client = tx || prisma;
  return await client.product.create({ data });
};

export const updateProduct = async (
  id: string,
  data: UpdateProduct,
  tx?: Prisma.TransactionClient,
) => {
  const client = tx || prisma;
  return await client.product.update({
    where: { id },
    data,
  });
};
