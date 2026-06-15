import { prisma } from "../config/db.js";

export const getUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({
    where: { email },
  });
};

export const getUserByUsername = async (username: string) => {
  return await prisma.user.findUnique({
    where: { username },
  });
};

export const getUserById = async (id: string) => {
  return await prisma.user.findUnique({
    where: { id },
  });
};

export const getUserRole = async (id: string) => {
  return await prisma.user.findUnique({
    where: { id },
    select: { role: true },
  });
};

export const deleteUserById = async (id: string) => {
  return await prisma.user.delete({
    where: { id },
  });
};
