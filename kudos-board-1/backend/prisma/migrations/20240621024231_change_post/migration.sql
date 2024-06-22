/*
  Warnings:

  - Added the required column `author` to the `KudosPost` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `KudosPost` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "KudosPost" ADD COLUMN     "author" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;
