/*
  Warnings:

  - The primary key for the `Application` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Application` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `CandidateProfile` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `CandidateProfile` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Company` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Company` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Job` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Job` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `jobId` on the `Application` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `candidateId` on the `Application` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `userId` on the `CandidateProfile` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `userId` on the `Company` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `companyId` on the `Job` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Application" DROP CONSTRAINT "Application_candidateId_fkey";

-- DropForeignKey
ALTER TABLE "Application" DROP CONSTRAINT "Application_jobId_fkey";

-- DropForeignKey
ALTER TABLE "CandidateProfile" DROP CONSTRAINT "CandidateProfile_userId_fkey";

-- DropForeignKey
ALTER TABLE "Company" DROP CONSTRAINT "Company_userId_fkey";

-- DropForeignKey
ALTER TABLE "Job" DROP CONSTRAINT "Job_companyId_fkey";

-- AlterTable
ALTER TABLE "Application" DROP CONSTRAINT "Application_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "jobId",
ADD COLUMN     "jobId" INTEGER NOT NULL,
DROP COLUMN "candidateId",
ADD COLUMN     "candidateId" INTEGER NOT NULL,
ADD CONSTRAINT "Application_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "CandidateProfile" DROP CONSTRAINT "CandidateProfile_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "userId",
ADD COLUMN     "userId" INTEGER NOT NULL,
ADD CONSTRAINT "CandidateProfile_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Company" DROP CONSTRAINT "Company_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "userId",
ADD COLUMN     "userId" INTEGER NOT NULL,
ADD CONSTRAINT "Company_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Job" DROP CONSTRAINT "Job_pkey",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "companyId",
ADD COLUMN     "companyId" INTEGER NOT NULL,
ADD CONSTRAINT "Job_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "CandidateProfile_userId_key" ON "CandidateProfile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Company_userId_key" ON "Company"("userId");

-- AddForeignKey
ALTER TABLE "CandidateProfile" ADD CONSTRAINT "CandidateProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Company" ADD CONSTRAINT "Company_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
