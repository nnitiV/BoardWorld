import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError.js";
import jwt from "jsonwebtoken"
import { AuthRequest } from "../types/express.js";

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
    const payload = jwt.verify(token, secret);

    if (typeof payload === "string" || !payload.sub) {
      throw new AppError("Invalid token payload structure.", 401);
    }

    req.user = { id: payload.sub };

    next();
  } catch (error) {
    next(error);
  }
};
