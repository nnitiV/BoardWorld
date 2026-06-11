export class AppError extends Error {
  public readonly status: number;
  public readonly isOperational: boolean;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    this.isOperational = true; // We explicitly threw this error

    // Captures the exact line of code where the error happened
    Error.captureStackTrace(this, this.constructor);
  }
}