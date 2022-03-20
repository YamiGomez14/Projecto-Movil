/*
  Warnings:

  - You are about to drop the `Carrito` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DetalleCarrito` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `notaCarrito` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Carrito" DROP CONSTRAINT "Carrito_id_usuario_fkey";

-- DropForeignKey
ALTER TABLE "DetalleCarrito" DROP CONSTRAINT "DetalleCarrito_id_articulo_fkey";

-- DropForeignKey
ALTER TABLE "DetalleCarrito" DROP CONSTRAINT "DetalleCarrito_id_carrito_fkey";

-- AlterTable
ALTER TABLE "Usuario" ADD COLUMN     "notaCarrito" TEXT NOT NULL;

-- DropTable
DROP TABLE "Carrito";

-- DropTable
DROP TABLE "DetalleCarrito";

-- CreateTable
CREATE TABLE "ItemCarrito" (
    "id" SERIAL NOT NULL,
    "id_usuario" INTEGER NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "id_articulo" INTEGER NOT NULL,

    CONSTRAINT "ItemCarrito_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ItemCarrito_id_usuario_key" ON "ItemCarrito"("id_usuario");

-- AddForeignKey
ALTER TABLE "ItemCarrito" ADD CONSTRAINT "ItemCarrito_id_articulo_fkey" FOREIGN KEY ("id_articulo") REFERENCES "Articulo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemCarrito" ADD CONSTRAINT "ItemCarrito_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
