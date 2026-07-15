import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import { convertPrismaError } from "../utils/prismaErrorConverter.js";
import { AppError } from "../utils/AppError.js";

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  // 1. Automatically convert DB errors to clean HTTP AppErrors first!
  const processedError = convertPrismaError(err);

  let status = 500;
  let message: any = "Internal server error";

  if (processedError instanceof AppError) {
    status = processedError.status;
    message = processedError.message;
  } else if (processedError instanceof ZodError) {
    status = 400;
    message = processedError.issues.map((issue) => ({
      field: issue.path.join("."),
      error: issue.message,
    }));
  } else {
    console.error("💥 Unexpected Error:", processedError);
  }

  res.status(status).json({ message });
};

export default globalErrorHandler;
