/*
  Warnings:

  - You are about to drop the `Flat` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Flat";

-- CreateTable
CREATE TABLE "flat" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,

    CONSTRAINT "flat_pkey" PRIMARY KEY ("id")
);
