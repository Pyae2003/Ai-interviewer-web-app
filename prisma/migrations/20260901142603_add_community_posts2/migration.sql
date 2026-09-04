/*
  Warnings:

  - A unique constraint covering the columns `[interviewId]` on the table `CommunityPost` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "CommunityPost" ADD COLUMN     "interviewId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "CommunityPost_interviewId_key" ON "CommunityPost"("interviewId");

-- CreateIndex
CREATE INDEX "CommunityPost_interviewId_idx" ON "CommunityPost"("interviewId");

-- AddForeignKey
ALTER TABLE "CommunityPost" ADD CONSTRAINT "CommunityPost_interviewId_fkey" FOREIGN KEY ("interviewId") REFERENCES "Interview"("id") ON DELETE SET NULL ON UPDATE CASCADE;
