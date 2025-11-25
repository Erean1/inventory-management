-- AlterTable
ALTER TABLE "User" ALTER COLUMN "reset_otp_expire_at" DROP NOT NULL,
ALTER COLUMN "verify_otp_expire_at" DROP NOT NULL;
