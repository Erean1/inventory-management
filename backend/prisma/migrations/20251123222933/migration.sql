/*
  Warnings:

  - Added the required column `reset_otp_expire_at` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `verify_otp_expire_at` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "reset_otp_expire_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "verify_otp_expire_at" TIMESTAMP(3) NOT NULL;
