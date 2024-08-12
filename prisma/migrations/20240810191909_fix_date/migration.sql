/*
  Warnings:

  - Made the column `deliverIt` on table `Task` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Task" ALTER COLUMN "deliverIt" SET NOT NULL,
ALTER COLUMN "deliverIt" SET DATA TYPE TEXT;
