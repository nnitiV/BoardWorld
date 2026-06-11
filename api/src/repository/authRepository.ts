import { prisma } from "../config/db.js";
import { RegisterUser } from "../types/user.types.js";

export const createUser = async (data: RegisterUser) => {
    return await prisma.user.create({ data });
};
