import { NextFunction, Request, Response } from "express";
import { LoginUserSchema, RegisterUserSchema } from "../types/user.types.js";
import * as authService from "../services/authServices.js";
import z from "zod";

export const register = async (req: Request, res: Response) => {
  const validatedData = RegisterUserSchema.parse(req.body);
  const newUser = await authService.registerUser(validatedData);
  const { password, ...safeUser } = newUser;
  res.status(200).json({ message: "User created.", user: safeUser });
};

export const login = async (req: Request, res: Response) => {
  const validatedData = LoginUserSchema.parse(req.body);
  const user = await authService.loginUser(validatedData);
  res.status(200).json({ message: "Logged in!", user });
};

const RefreshTokenSchema = z.object({
  refreshToken: z.string({ error: "Refresh token is required." }).min(1),
});

export const refreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { refreshToken: incomingToken } = RefreshTokenSchema.parse(req.body);
    const { accessToken, refreshToken } =
      await authService.refreshSession(incomingToken);
    res.status(200).json({ accessToken, refreshToken });
  } catch (error) {
    next(error);
  }
};
