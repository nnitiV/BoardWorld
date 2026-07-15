import { Prisma } from "@prisma/client";
import { AppError } from "./AppError.js";

const UNIQUE_CONSTRAINT_MESSAGES: Record<string, string> = {
  "Review_productId_userId_key": "You have already submitted a review for this product.",
  "User_email_key": "An account with this email address already exists.",
  "Category_name_key": "A category with this name already exists.",
};

export const convertPrismaError = (err: unknown): unknown => {
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    switch (err.code) {
      case "P2002": {
        const modelName = err.meta?.modelName as string;
        const targets = err.meta?.target as string[] | undefined;
        const constraintKey = targets ? `${modelName}_${targets.join("_")}_key` : "";
        
        const message = UNIQUE_CONSTRAINT_MESSAGES[constraintKey] 
          || `A record with this ${targets?.join(" and ") || "field"} already exists.`;

        return new AppError(message, 409); // Map to standard HTTP 409
      }
      
      case "P2025": {
        return new AppError(err.meta?.cause as string || "The requested record was not found.", 404); // Map to HTTP 404
      }
      
      // Add other database-specific mappings here (e.g. foreign key violations)
    }
  }
  return err; // If it's not a database error, return it as-is
};