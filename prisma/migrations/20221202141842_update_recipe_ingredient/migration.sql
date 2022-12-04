/*
  Warnings:

  - The primary key for the `IngredientOnRecipe` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `unitId` to the `IngredientOnRecipe` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "IngredientOnRecipe" DROP CONSTRAINT "IngredientOnRecipe_pkey",
ADD COLUMN     "unitId" INTEGER NOT NULL,
ADD CONSTRAINT "IngredientOnRecipe_pkey" PRIMARY KEY ("unitId", "ingredientId", "recipeId");

-- AddForeignKey
ALTER TABLE "IngredientOnRecipe" ADD CONSTRAINT "IngredientOnRecipe_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "Unit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
