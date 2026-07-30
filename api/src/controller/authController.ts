import { Request, Response } from "express";
import { LoginUserSchema, RegisterUserSchema } from "../types/user.types.js";
import * as authService from "../services/authServices.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const register =  asyncHandler(async (req: Request, res: Response) => {
  const validatedData = RegisterUserSchema.parse(req.body);
  const newUser = await authService.registerUser(validatedData);
  res.status(200).json({ message: "User created.", user: newUser });
});

export const login =  asyncHandler(async (req: Request, res: Response) => {
  const validatedData = LoginUserSchema.parse(req.body);
  const userAgentString = req.headers["user-agent"] || "";
  const deviceId = req.body.deviceId;

  if (!deviceId) {
    return res.status(400).json({ message: "Device ID is required." });
  }

  const {
    safeUser: user,
    cart,
    orders,
    accessToken,
    refreshToken,
  } = await authService.loginUser(validatedData, userAgentString, deviceId);
  if (refreshToken) {
    res.cookie("refresh_token", refreshToken.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      expires: refreshToken.expiresAt,
    });
  }
  res.cookie("user_role", user.role, {
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  res.cookie("is_logged_in", "true", {
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  res.status(200).json({ message: "Logged in!", user, cart, orders, accessToken });
});

export const logout = async (req: Request, res: Response) => {
  const token = req.cookies.refresh_token;
  if (!token) {
    return res.status(200).json({ message: "Already logged out." });
  }
  await authService.logoutUser(token);
  res.clearCookie("refresh_token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });

  res.clearCookie("is_logged_in");
  res.clearCookie("user_role");

  res.status(200).json({ message: "Logged out successfully!" });
};

export const refreshToken = async (req: Request, res: Response) => {
  const incomingToken = req.cookies.refresh_token;
  if (!incomingToken) {
    res.status(401).json({ message: "No refresh token cookie provided." });
    return;
  }
  const { accessToken } =
    await authService.refreshSession(incomingToken);
  res.status(200).json({ accessToken });
};
