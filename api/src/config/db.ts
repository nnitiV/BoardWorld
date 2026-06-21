import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";

type GlobalPrisma = {
  prisma: PrismaClient | undefined;
  pool: Pool | undefined;
};

const globalForPrisma = globalThis as unknown as GlobalPrisma;

export const pool =
  globalForPrisma.pool ||
  new Pool({
    connectionString: process.env.DATABASE_URL,
  });

const adapter = new PrismaPg(pool);

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter,
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.pool = pool;
  globalForPrisma.prisma = prisma;
}
