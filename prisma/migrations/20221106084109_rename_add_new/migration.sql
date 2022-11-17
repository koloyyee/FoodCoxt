/*
  Warnings:

  - You are about to drop the column `phont` on the `Supplier` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[phone]` on the table `Supplier` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `typeId` to the `Ingredient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `IngredientOnRecipe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Recipe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalCost` to the `Recipe` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Supplier_phont_key";

-- AlterTable
ALTER TABLE "Ingredient" ADD COLUMN     "typeId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "IngredientOnRecipe" ADD COLUMN     "quantity" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "Recipe" ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "totalCost" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "Supplier" RENAME COLUMN "phont" TO  "phone";

-- CreateTable
CREATE TABLE "Type" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "Type_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Type_name_key" ON "Type"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Supplier_phone_key" ON "Supplier"("phone");

-- AddForeignKey
ALTER TABLE "Ingredient" ADD CONSTRAINT "Ingredient_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "Type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
