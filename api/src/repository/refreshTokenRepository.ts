import { Prisma } from "@prisma/client";
import { prisma } from "../config/db.js";

export const getRefreshToken = async (token: string) => {
  return await prisma.refreshToken.findUnique({
    where: { token },
  });
};

export const upsertRefreshToken = async (
  token: string,
  userId: string,
  deviceId: string,
  expiresAt: Date,
  tx?: Prisma.TransactionClient,
) => {
  const client = tx || prisma;
  return await client.refreshToken.upsert({
    where: {
      userId_deviceId: {
        userId: userId,
        deviceId: deviceId,
      },
    },
    update: {
      token,
      expiresAt,
    },
    create: {
      userId,
      deviceId,
      token,
      expiresAt,
    },
  });
};

export const deleteRefreshToken = async (
  token: string,
  tx?: Prisma.TransactionClient,
) => {
  const client = tx || prisma;
  return await client.refreshToken.deleteMany({ where: { token } });
};

export const deleteTokensByDeviceId = async (
  userId: string,
  deviceId: string,
  tx?: Prisma.TransactionClient,
) => {
  const client = tx || prisma;
  return await client.refreshToken.delete({
    where: { userId_deviceId: { userId, deviceId } },
  });
};
