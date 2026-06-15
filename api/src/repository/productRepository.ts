import { Prisma } from "@prisma/client";
import { prisma } from "../config/db.js";

export const createProduct = async (
  data: Prisma.ProductCreateInput,
  tx?: Prisma.TransactionClient,
) => {
  const client = tx || prisma;
  return await client.product.create({ data });
};
