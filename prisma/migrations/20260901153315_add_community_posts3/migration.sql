/*
  Warnings:

  - You are about to drop the column `grade` on the `CommunityPost` table. All the data in the column will be lost.
  - You are about to drop the column `score` on the `CommunityPost` table. All the data in the column will be lost.
  - You are about to drop the `PostImage` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PostImage" DROP CONSTRAINT "PostImage_postId_fkey";

-- AlterTable
ALTER TABLE "CommunityPost" DROP COLUMN "grade",
DROP COLUMN "score",
ADD COLUMN     "images" TEXT[] DEFAULT ARRAY[]::TEXT[];

-- DropTable
DROP TABLE "PostImage";
