import { Response } from "express";
import * as userService from "../services/userService.js";
import { AuthRequest } from "../types/express.js";
import { AppError } from "../utils/AppError.js";
import { Role } from "@prisma/client";

export const getLoggedUserProfile = async (req: AuthRequest, res: Response) => {
  const id = req.user?.id;
  if (!id) {
    throw new AppError("User context missing from request.", 401);
  }
  const user = await userService.getLoggedUserProfile(id);
  res.status(200).json({ user });
};

export const testAdminRoute = async (req: AuthRequest, res: Response) => {
  const id = req.user?.id;
  if (!id) {
    throw new AppError("User context missing from request.", 401);
  }
  const { role } = await userService.getUserRole(id);
  if (role != Role.ADMIN) {
    throw new AppError("You can't access this resource.", 401);
  }

  res.status(200).json({ message: "You're in." });
};

export const deleteUserById = async (req: AuthRequest, res: Response) => {
  const id = req.user?.id;
  if (!id) {
    throw new AppError("User context missing from request.", 401);
  }
  const user = await userService.deleteUserById(id);
  res.status(200).json({ user });
};

