import { Response } from "express";
import * as deviceService from "../services/deviceService.js";
import { AuthRequest } from "../types/express.js";
import { AppError } from "../utils/AppError.js";

export const getMyDevices = async (
  req: AuthRequest,
  res: Response,
) => {
  const userId = req.user?.id;
  if (!userId) {
    throw new AppError("User context missing from request.", 401);
  }
  const devices = await deviceService.listUserDevices(userId);
  res.status(200).json({ message: "Carts retrieved.", devices });
};

export const revokeDevice = async (
  req: AuthRequest<{ deviceId: string }>,
  res: Response,
) => {
  const userId = req.user?.id;
  if (!userId) {
    throw new AppError("User context missing from request.", 401);
  }
  const deviceId = req.params.deviceId;

  await deviceService.revokeUserDevice(userId, deviceId);

  res.status(200).json({
    message: "Device and associated sessions revoked successfully.",
  });
};
