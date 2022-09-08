-- CreateTable
CREATE TABLE "Stesa" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "immagine" TEXT NOT NULL,
    "titolo" TEXT NOT NULL,
    "contenuto" TEXT NOT NULL,
    "dataCreazione" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modifiche" DATETIME NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Stesa_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
