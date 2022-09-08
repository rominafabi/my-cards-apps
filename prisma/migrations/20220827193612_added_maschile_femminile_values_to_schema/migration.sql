/*
  Warnings:

  - Added the required column `femminile` to the `Stesa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `femminilePic` to the `Stesa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `maschile` to the `Stesa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `maschilePic` to the `Stesa` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Stesa" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "immagine" TEXT NOT NULL,
    "titolo" TEXT NOT NULL,
    "contenuto" TEXT NOT NULL,
    "femminile" TEXT NOT NULL,
    "femminilePic" TEXT NOT NULL,
    "maschile" TEXT NOT NULL,
    "maschilePic" TEXT NOT NULL,
    "dataCreazione" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modifiche" DATETIME NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Stesa_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Stesa" ("contenuto", "dataCreazione", "id", "immagine", "modifiche", "titolo", "userId") SELECT "contenuto", "dataCreazione", "id", "immagine", "modifiche", "titolo", "userId" FROM "Stesa";
DROP TABLE "Stesa";
ALTER TABLE "new_Stesa" RENAME TO "Stesa";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
