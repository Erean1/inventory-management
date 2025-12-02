/*
  Warnings:

  - You are about to drop the `CompanyProduct` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `company_id` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CompanyProduct" DROP CONSTRAINT "CompanyProduct_company_id_fkey";

-- DropForeignKey
ALTER TABLE "CompanyProduct" DROP CONSTRAINT "CompanyProduct_product_id_fkey";

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "company_id" INTEGER NOT NULL;

-- DropTable
DROP TABLE "CompanyProduct";

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
