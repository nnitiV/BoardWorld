import * as userDeviceRepository from "../repository/deviceRepository.js";
import * as authService from "./authServices.js"; 
import { AppError } from "../utils/AppError.js";

export const listUserDevices = async (userId: string) => {
  return await userDeviceRepository.getDevicesByUserId(userId);
};

export const revokeUserDevice = async (userId: string, deviceId: string) => {
  await authService.revokeTokensForDevice(userId, deviceId);

  try {
    await userDeviceRepository.deleteDevice(userId, deviceId);
  } catch (error) {
    throw new AppError("Device not found or already removed.", 404);
  }
  
  return true;
};