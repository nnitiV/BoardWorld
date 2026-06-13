import { Prisma } from "@prisma/client";
import { prisma } from "../config/db.js";

export const getRefreshToken = async (token: string) => {
  return await prisma.refreshToken.findUnique({
    where: { token },
  });
};

export const createRefreshToken = async (
  token: string,
  userId: string,
  expiresAt: Date,
  tx?: Prisma.TransactionClient,
) => {
  const client = tx || prisma;
  return await client.refreshToken.create({
    data: {
      token,
      userId,
      expiresAt,
    },
  });
};

export const deleteRefreshToken = async (
  token: string,
  tx?: Prisma.TransactionClient,
) => {
  const client = tx || prisma;
  return await client.refreshToken.delete({ where: { token } });
};
