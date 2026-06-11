import * as userRepository from "../repository/authRepository.js";
import { RegisterUser } from "../types/user.types.js";
import bcrypt from "bcrypt";

export const registerUser = async (userData: RegisterUser) => {
  const hashedPassword = await bcrypt.hash(userData.password, 12);
  return await userRepository.createUser({
    ...userData,
    password: hashedPassword,
  });
};
