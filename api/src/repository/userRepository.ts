import { Prisma, UserStatus } from "@prisma/client";
import { prisma } from "../config/db.js";
import prismaConfig from "../../prisma.config.js";

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

export const updateUserStripeId = async (userId: string, stripeId: string, tx?: Prisma.TransactionClient) => {
  const client = tx || prisma;
  return await client.user.update({
    where: { id: userId },
    data: {
      stripeCustomerId: stripeId
    }
  })
}

export const deleteUserById = async (id: string) => {
  return await prisma.user.update({
    where: { id },
    data: {
      userStatus: UserStatus.INACTIVE,
      name: "Anonymous Player",
      username: `anonymous_${Math.floor(100000 + Math.random() * 900000)}`, // e.g., anonymous_482910
      email: null,
      password: null, // Wipe the hash completely
    },
  });
};
