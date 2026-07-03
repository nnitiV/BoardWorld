/*
  Warnings:

  - The `productId` column on the `Product` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "productId",
ADD COLUMN     "productId" SERIAL NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Product_productId_key" ON "Product"("productId");
