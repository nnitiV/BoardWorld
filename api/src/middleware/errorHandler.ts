import { ErrorRequestHandler, NextFunction, Response } from "express";
import { AppError } from "../utils/AppError.js";
import { ZodError } from "zod";

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let status = 500;
  let message: any = "Internal server error";

  if (err instanceof AppError) {
    status = err.status;
    message = err.message;
  } else if (err instanceof ZodError) {
    status = 400;
    
    message = err.issues.map(issue => ({
      field: issue.path.join('.'),
      error: issue.message
    }));
    
  } else {
    console.error("💥 Unexpected Error:", err);
  }

  res.status(status).json({ message });
};

export default globalErrorHandler;