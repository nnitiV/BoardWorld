import { Response } from "express";
import { getLoggedUserProfile } from "../services/userService.js";
import { AuthRequest } from "../types/express.js";
import { AppError } from "../utils/AppError.js";

export const getLoggedUser = async (req: AuthRequest, res: Response) => {
  const id  = req.user?.id;
  if (!id) {
    throw new AppError("User context missing from request.", 401);
  }
  const user = await getLoggedUserProfile(id);
  res.status(200).json({ user });
};
