import { Request, Response } from "express";
import { LoginUserSchema, RegisterUserSchema } from "../types/user.types.js";
import { loginUser, registerUser } from "../services/authServices.js";

export const register = async (req: Request, res: Response) => {
  const validatedData = RegisterUserSchema.parse(req.body);
  const newUser  = await registerUser(validatedData); 
  const {password, ...safeUser} = newUser;
  res.status(200).json({ message: "User created.", user: safeUser });
};

export const login = async (req: Request, res: Response) => {
  const validatedData = LoginUserSchema.parse(req.body);
  const user = await loginUser(validatedData);
  res.status(200).json({message: "Logged in!", user});
}