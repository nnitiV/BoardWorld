import * as authRepository from "../repository/authRepository.js";
import * as userService from "../services/userService.js";
import * as cartService from "../services/cartService.js";
import * as refreshTokenService from "../services/refreshTokenService.js";
import { LoginUser, RegisterUser } from "../types/user.types.js";
import crypto from "crypto"
import bcrypt from "bcrypt";
import { AppError } from "../utils/AppError.js";
import jwt from "jsonwebtoken";
import { UAParser } from "ua-parser-js";
import * as userDeviceRepository from "../repository/deviceRepository.js";

export const registerUser = async (userData: RegisterUser) => {
  if (await userService.getUserByEmail(userData.email)) {
    throw new AppError("Email alread in use.", 400);
  }
  if (await userService.getUserByUsername(userData.username)) {
    throw new AppError("Username alread in use.", 400);
  }
  const hashedPassword = await bcrypt.hash(userData.password, 12);
  const newUser = await authRepository.registerUser({
    ...userData,
    password: hashedPassword,
  });
  const {password, ...safeUser} = newUser;
  return safeUser;
};

export const loginUser = async (userData: LoginUser, userAgentString: string, deviceId: string) => {
  const user =
    (await userService.getUserByEmail(userData.login)) ||
    (await userService.getUserByUsername(userData.login));
  if (!user) {
    throw new AppError("User don't exist.", 404);
  }
  if(!user.password) {
    throw new AppError("User password not provided.", 400);
  }
  const isPasswordValid = await bcrypt.compare(
    userData.password,
    user.password,
  );
  if (!isPasswordValid) {
    throw new AppError("Invalid password.", 401);
  }

  const parser = new UAParser(userAgentString);
  const browser = parser.getBrowser().name;
  const os = parser.getOS().name;
  if(!browser || !os) {
    throw new AppError("Unknown device.", 400)
  }

  const deviceName = `${browser} on ${os}`;

  await userDeviceRepository.upsertDevice(user.id, deviceId, deviceName, os);

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new AppError(
      "FATAL: JWT_SECRET is not defined in the variables.",
      500,
    );
  }
  const accessToken = jwt.sign({ sub: user.id }, secret, {
    expiresIn: "1h",
  });

  let refreshToken = null;
  if(userData.rememberMe) {
    const rawToken = crypto.randomBytes(64).toString("hex");
    const expiresAt = new Date(Date.now() + (7 * 24 * 60 * 60 * 1000));
    refreshToken = await refreshTokenService.upsertRefreshToken(rawToken, user.id, deviceId, expiresAt)
  }
  const cart = await cartService.getCartByUserId(user.id);
  
  const { password, ...safeUser } = user;

  return { safeUser, cart, accessToken, refreshToken };
};

export const logoutUser = async (token: string) => {
  await refreshTokenService.deleteRefreshToken(token);
};

export const refreshSession = async (token: string) => {
  const storedToken = await refreshTokenService.getRefreshToken(token);
  if (!storedToken) {
    throw new AppError("No such token stored.", 401);
  }
  if (new Date() > storedToken.expiresAt) {
    await refreshTokenService.deleteRefreshToken(storedToken.token);
    throw new AppError("Token expired.", 401);
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new AppError("There was an internal server error.", 500);
  }

  const accessToken = jwt.sign({ sub: storedToken.userId }, secret, {
    expiresIn: "1h",
  });

  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const rawToken = crypto.randomBytes(64).toString("hex");

  const newRefreshToken = await refreshTokenService.upsertRefreshToken(
    rawToken,
    storedToken.userId,
    storedToken.deviceId, 
    expiresAt
  );

  return { accessToken };
};

export const deleteToken = async (token: string) => {
  const wasItDeleted = await refreshTokenService.deleteRefreshToken(token);
  if(!wasItDeleted) {
    throw new AppError("Token not found.", 404);
  }
  return !!wasItDeleted;
}

export const revokeTokensForDevice = async (userId: string, deviceId: string) => {
  await refreshTokenService.deleteTokensByDeviceId(userId, deviceId);
};