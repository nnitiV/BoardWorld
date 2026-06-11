export class AppError extends Error {
  public readonly status: number;
  public readonly isOperational: boolean;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    this.isOperational = true; // We explicitly threw this error

    Error.captureStackTrace(this, this.constructor);
  }
}