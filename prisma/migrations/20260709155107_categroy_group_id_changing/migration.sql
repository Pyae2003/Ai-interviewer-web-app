/*
  Warnings:

  - You are about to drop the column `CategoryGroupId` on the `Category` table. All the data in the column will be lost.
  - Made the column `categoryGroupId` on table `Category` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_categoryGroupId_fkey";

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "CategoryGroupId",
ALTER COLUMN "categoryGroupId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_categoryGroupId_fkey" FOREIGN KEY ("categoryGroupId") REFERENCES "CategoryGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
