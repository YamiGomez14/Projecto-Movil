/*
  Warnings:

  - A unique constraint covering the columns `[id_usuario,id_articulo]` on the table `ItemCarrito` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "ItemCarrito_id_usuario_key";

-- CreateIndex
CREATE UNIQUE INDEX "ItemCarrito_id_usuario_id_articulo_key" ON "ItemCarrito"("id_usuario", "id_articulo");
