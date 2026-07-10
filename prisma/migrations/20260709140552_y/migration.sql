/*
  Warnings:

  - Added the required column `CategoryGroupId` to the `Category` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "CategoryGroupType" AS ENUM ('LANGUAGE', 'POSITION', 'FRAMEWORK', 'DATABASE', 'CLOUD', 'DEVOPS', 'MOBILE', 'AI', 'OTHER');

-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "CategoryGroupId" TEXT NOT NULL,
ADD COLUMN     "categoryGroupId" TEXT;

-- CreateTable
CREATE TABLE "CategoryGroup" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "type" "CategoryGroupType" NOT NULL,
    "description" TEXT,
    "icon" TEXT,
    "color" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CategoryGroup_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CategoryGroup_slug_key" ON "CategoryGroup"("slug");

-- CreateIndex
CREATE INDEX "CategoryGroup_type_idx" ON "CategoryGroup"("type");

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_categoryGroupId_fkey" FOREIGN KEY ("categoryGroupId") REFERENCES "CategoryGroup"("id") ON DELETE SET NULL ON UPDATE CASCADE;
