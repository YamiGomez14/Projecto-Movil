/*
  Warnings:

  - Added the required column `price` to the `ItemCarrito` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ItemCarrito" ADD COLUMN     "price" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "Usuario" ALTER COLUMN "notaCarrito" DROP NOT NULL;
