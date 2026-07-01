-- AlterEnum
ALTER TYPE "InterviewStatus" ADD VALUE 'FAILED';

-- AlterTable
ALTER TABLE "InterviewAnswer" ADD COLUMN     "idealAnswer" TEXT,
ADD COLUMN     "isCorrect" BOOLEAN,
ADD COLUMN     "strengths" TEXT,
ADD COLUMN     "weaknesses" TEXT;

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "lastLogin" TIMESTAMP(3);
