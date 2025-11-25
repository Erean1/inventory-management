/*
  Warnings:

  - The primary key for the `RolesOnUsers` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `assignedAt` on the `RolesOnUsers` table. All the data in the column will be lost.
  - You are about to drop the column `assignedBy` on the `RolesOnUsers` table. All the data in the column will be lost.
  - You are about to drop the column `roleId` on the `RolesOnUsers` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `RolesOnUsers` table. All the data in the column will be lost.
  - You are about to drop the column `isVerified` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `resetOtp` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `verifyOtp` on the `User` table. All the data in the column will be lost.
  - Added the required column `assigned_by` to the `RolesOnUsers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role_id` to the `RolesOnUsers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `RolesOnUsers` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "RolesOnUsers" DROP CONSTRAINT "RolesOnUsers_roleId_fkey";

-- DropForeignKey
ALTER TABLE "RolesOnUsers" DROP CONSTRAINT "RolesOnUsers_userId_fkey";

-- AlterTable
ALTER TABLE "RolesOnUsers" DROP CONSTRAINT "RolesOnUsers_pkey",
DROP COLUMN "assignedAt",
DROP COLUMN "assignedBy",
DROP COLUMN "roleId",
DROP COLUMN "userId",
ADD COLUMN     "assigned_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "assigned_by" TEXT NOT NULL,
ADD COLUMN     "role_id" INTEGER NOT NULL,
ADD COLUMN     "user_id" INTEGER NOT NULL,
ADD CONSTRAINT "RolesOnUsers_pkey" PRIMARY KEY ("role_id", "user_id");

-- AlterTable
ALTER TABLE "User" DROP COLUMN "isVerified",
DROP COLUMN "resetOtp",
DROP COLUMN "verifyOtp",
ADD COLUMN     "is_verified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "reset_otp" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "verify_otp" TEXT NOT NULL DEFAULT '';

-- AddForeignKey
ALTER TABLE "RolesOnUsers" ADD CONSTRAINT "RolesOnUsers_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RolesOnUsers" ADD CONSTRAINT "RolesOnUsers_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
