import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError.js";
import * as userService from "../services/userService.js";
import jwt from "jsonwebtoken";
import { AuthRequest } from "../types/express.js";
import { Role } from "@prisma/client";

export const protect = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer")) {
      throw new AppError("Not authorized to access this route.", 401);
    }

    const token = authHeader.split(" ")[1];
    const secret = process.env.JWT_SECRET;

    if (!token || !secret) {
      throw new AppError(
        "Authentication failed due to missing configurations.",
        401,
      );
    }
    let payload = null;
    try {
      payload = jwt.verify(token, secret);
    } catch (error: any) {
      if (error.name == "TokenExpiredError") {
        throw new AppError("Token expired.", 401);
      }
      if (error.name === "JsonWebTokenError") {
        throw new AppError("Invalid token signature.", 401);
      }

      throw error;
    }

    if (typeof payload === "string" || !payload?.sub) {
      throw new AppError("Invalid token payload structure.", 401);
    }
    req.user = { id: payload.sub };

    next();
  } catch (error) {
    next(error);
  }
};

export const restrictTo = (...roles: Role[]) => {
  return async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const id = req.user?.id;
      if (!id) {
        throw new AppError("User context missing from request.", 401);
      }
      const { role } = await userService.getUserRole(id);

      if (!roles.includes(role)) {
        throw new AppError("You can't access this resource.", 401);
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};
