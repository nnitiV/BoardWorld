import * as authRepository from "../repository/authRepository.js";
import * as userRepository from "../repository/userRepository.js";
import { LoginUser, RegisterUser } from "../types/user.types.js";
import bcrypt from "bcrypt";
import { AppError } from "../utils/AppError.js";

export const registerUser = async (userData: RegisterUser) => {
  if (await userRepository.getUserByEmail(userData.email)) {
    throw new AppError("Email alread in use.", 400);
  }
  if (await userRepository.getUserByUsername(userData.username)) {
    throw new AppError("Username alread in use.", 400);
  }
  const hashedPassword = await bcrypt.hash(userData.password, 12);
  return await authRepository.registerUser({
    ...userData,
    password: hashedPassword,
  });
};

export const loginUser = async (userData: LoginUser) => {
  const user = (await userRepository.getUserByEmail(userData.login) || await userRepository.getUserByUsername(userData.login))
  if (!user) {
    throw new AppError("User don't exist.", 404);
  }
  const {password, ...safeUser} = user;
  return user;  
};