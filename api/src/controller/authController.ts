import { Request, Response } from "express";
import { RegisterUser, RegisterUserSchema } from "../types/user.types.js";
import { registerUser } from "../services/authServices.js";

export const register = async (req: Request, res: Response) => {
  const validatedData = RegisterUserSchema.parse(req.body);
  const newUser  = await registerUser(validatedData); 
  const {password, ...safeUser} = newUser;
  res.status(200).json({ message: "User created.", user: safeUser });
};
