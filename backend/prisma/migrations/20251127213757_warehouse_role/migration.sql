/*
  Warnings:

  - You are about to drop the `WareHouse` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WareHouseManager` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "WarehouseRole" AS ENUM ('ADMIN', 'MEMBER');

-- DropForeignKey
ALTER TABLE "WareHouse" DROP CONSTRAINT "WareHouse_company_id_fkey";

-- DropForeignKey
ALTER TABLE "WareHouseManager" DROP CONSTRAINT "WareHouseManager_user_id_fkey";

-- DropForeignKey
ALTER TABLE "WareHouseManager" DROP CONSTRAINT "WareHouseManager_warehouse_id_fkey";

-- DropTable
DROP TABLE "WareHouse";

-- DropTable
DROP TABLE "WareHouseManager";

-- CreateTable
CREATE TABLE "Warehouse" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "company_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "capacity" INTEGER NOT NULL DEFAULT 50,

    CONSTRAINT "Warehouse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WarehouseManager" (
    "user_id" INTEGER NOT NULL,
    "warehouse_id" INTEGER NOT NULL,
    "joined_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "role" "WarehouseRole" NOT NULL DEFAULT 'MEMBER',

    CONSTRAINT "WarehouseManager_pkey" PRIMARY KEY ("user_id","warehouse_id")
);

-- AddForeignKey
ALTER TABLE "Warehouse" ADD CONSTRAINT "Warehouse_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WarehouseManager" ADD CONSTRAINT "WarehouseManager_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WarehouseManager" ADD CONSTRAINT "WarehouseManager_warehouse_id_fkey" FOREIGN KEY ("warehouse_id") REFERENCES "Warehouse"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
