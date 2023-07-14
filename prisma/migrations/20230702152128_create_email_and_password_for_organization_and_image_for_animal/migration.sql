/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `organizations` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `organizations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password_hash` to the `organizations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "animals" ADD COLUMN     "image" TEXT;

-- AlterTable
ALTER TABLE "organizations" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "password_hash" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "organizations_email_key" ON "organizations"("email");
