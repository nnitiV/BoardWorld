import { AppError } from "../utils/AppError.js";
import * as userRepository from "../repository/userRepository.js";

export const getUserById = async (userId: string) => {
  return await userRepository.getUserById(userId);
}

export const getUserByEmail = async (email: string) => {
  return await userRepository.getUserByEmail(email);
}

export const getUserByUsername = async (username: string) => {
  return await userRepository.getUserByUsername(username);
}

export const getLoggedUserProfile = async (id: string) => {
  const user = await userRepository.getUserById(id);
  if (!user) {
    throw new AppError("User doesn't exist.", 404);
  }
  const {password, ...safeUser} = user;
  return safeUser;
};

export const getUserRole = async (id: string) => {
  const userRole = await userRepository.getUserRole(id);
  if(!userRole) {
    throw new AppError("User doesn't exist.", 404);
  }
  return userRole;
}

export const updateUserStripeId = async (userId: string, stripeId: string) => {
  return await userRepository.updateUserStripeId(userId, stripeId);
}

export const deleteUserById = async (id: string) => {
  const wasUserDeleted = await userRepository.deleteUserById(id);
  if(!wasUserDeleted) {
    throw new AppError("User not found.", 404);
  }
  return true;
}