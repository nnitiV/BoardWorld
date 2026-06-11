/*
  Warnings:

  - You are about to drop the column `date_of_birth` on the `users` table. All the data in the column will be lost.
  - Added the required column `dateOfBirth` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "date_of_birth",
ADD COLUMN     "dateOfBirth" TIMESTAMP(3) NOT NULL;
