import { Request, Response } from "express";
import { AppError } from "../utils/AppError.js";
import { RegisterUserSchema } from "../types/user.types.js";

export const register = async (req: Request, res: Response) => {
  const {email, password, name, username, dateOfBirth} = RegisterUserSchema.parse(req.body);
  
  res.status(200).json("Teste");
};