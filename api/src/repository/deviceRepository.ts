import { prisma } from "../config/db.js";

export const upsertDevice = async (
  userId: string,
  deviceId: string,
  deviceName: string,
  os: string,
) => {
  return await prisma.userDevice.upsert({
    where: {
      userId_deviceId: { userId, deviceId },
    },
    update: {
      lastActiveAt: new Date(),
      deviceName,
      os,
    },
    create: {
      userId,
      deviceId,
      deviceName,
      os,
    },
  });
};

export const getDevicesByUserId = async (userId: string) => {
  return await prisma.userDevice.findMany({
    where: { userId },
    orderBy: { lastActiveAt: "desc" },
  });
};

export const deleteDevice = async (userId: string, deviceId: string) => {
  return await prisma.userDevice.delete({
    where: {
      userId_deviceId: { userId, deviceId },
    },
  });
};
