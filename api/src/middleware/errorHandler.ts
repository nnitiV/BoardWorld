import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError.js";
import { ZodError } from "zod";

export default function globalErrorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  let status = 500;
  let message: any = "Internal server error";

  if (err instanceof AppError) {
    status = err.status;
    message = err.message;
  }else if (err instanceof ZodError) {
    status = 400;
    
    message = err.issues.map(issue => ({
      field: issue.path.join('.'),
      error: issue.message
    }));
    
  } else {
    console.error("💥 Unexpected Error:", err);
  }

  res.status(status).json({ message });
}
