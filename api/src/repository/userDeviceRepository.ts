import { prisma } from "../config/db.js";

export const userDeviceRepository = {
  upsertDevice: async (
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
  },
};
