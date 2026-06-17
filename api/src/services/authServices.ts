import * as authRepository from "../repository/authRepository.js";
import * as userRepository from "../repository/userRepository.js";
import * as refreshTokenRepository from "../repository/refreshTokenRepository.js";
import { LoginUser, RegisterUser } from "../types/user.types.js";
import crypto from "crypto"
import bcrypt from "bcrypt";
import { AppError } from "../utils/AppError.js";
import jwt from "jsonwebtoken";
import { prisma } from "../config/db.js";

export const registerUser = async (userData: RegisterUser) => {
  if (await userRepository.getUserByEmail(userData.email)) {
    throw new AppError("Email alread in use.", 400);
  }
  if (await userRepository.getUserByUsername(userData.username)) {
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

export const loginUser = async (userData: LoginUser) => {
  const user =
    (await userRepository.getUserByEmail(userData.login)) ||
    (await userRepository.getUserByUsername(userData.login));
  if (!user) {
    throw new AppError("User don't exist.", 404);
  }
  const isPasswordValid = await bcrypt.compare(
    userData.password,
    user.password,
  );
  if (!isPasswordValid) {
    throw new AppError("Invalid password.", 401);
  }
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
    const deviceId = userData.deviceId || "unknown-device";
    refreshToken = await refreshTokenRepository.upsertRefreshToken(rawToken, user.id, deviceId, expiresAt)
  }

  const { password, ...safeUser } = user;
  return { safeUser, accessToken, refreshToken };
};

export const logoutUser = async (token: string) => {
  await refreshTokenRepository.deleteRefreshToken(token);
};

export const refreshSession = async (token: string) => {
  const storedToken = await refreshTokenRepository.getRefreshToken(token);
  if (!storedToken) {
    throw new AppError("No such token stored.", 401);
  }
  if (new Date() > storedToken.expiresAt) {
    await refreshTokenRepository.deleteRefreshToken(storedToken.token);
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

  const newRefreshToken = await refreshTokenRepository.upsertRefreshToken(
    rawToken,
    storedToken.userId,
    storedToken.deviceId, 
    expiresAt
  );

  return { accessToken, refreshToken: newRefreshToken.token };
};

export const deleteToken = async (token: string) => {
  const wasItDeleted = await refreshTokenRepository.deleteRefreshToken(token);
  if(!wasItDeleted) {
    throw new AppError("Token not found.", 404);
  }
  return !!wasItDeleted;
}