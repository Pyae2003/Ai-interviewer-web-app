/*
  Warnings:

  - A unique constraint covering the columns `[interviewQuestionId]` on the table `InterviewAnswer` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "InterviewAnswer_interviewQuestionId_key" ON "InterviewAnswer"("interviewQuestionId");
