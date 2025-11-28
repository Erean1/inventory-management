-- CreateTable
CREATE TABLE "WareHouse" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "company_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "capacity" INTEGER NOT NULL DEFAULT 50,

    CONSTRAINT "WareHouse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WareHouseManager" (
    "user_id" INTEGER NOT NULL,
    "warehouse_id" INTEGER NOT NULL,
    "joined_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WareHouseManager_pkey" PRIMARY KEY ("user_id","warehouse_id")
);

-- AddForeignKey
ALTER TABLE "WareHouse" ADD CONSTRAINT "WareHouse_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WareHouseManager" ADD CONSTRAINT "WareHouseManager_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WareHouseManager" ADD CONSTRAINT "WareHouseManager_warehouse_id_fkey" FOREIGN KEY ("warehouse_id") REFERENCES "WareHouse"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
