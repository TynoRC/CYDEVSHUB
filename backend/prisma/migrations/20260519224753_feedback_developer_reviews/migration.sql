/*
  Warnings:

  - Added the required column `developerEmail` to the `Feedback` table without a default value. This is not possible if the table is not empty.
  - Added the required column `developerName` to the `Feedback` table without a default value. This is not possible if the table is not empty.
  - Added the required column `satisfaction` to the `Feedback` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Feedback" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "developerName" TEXT NOT NULL,
    "developerEmail" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "satisfaction" INTEGER NOT NULL,
    "message" TEXT NOT NULL,
    "projectTitle" TEXT,
    "userId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Feedback_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Feedback" ("createdAt", "id", "message", "rating", "userId") SELECT "createdAt", "id", "message", "rating", "userId" FROM "Feedback";
DROP TABLE "Feedback";
ALTER TABLE "new_Feedback" RENAME TO "Feedback";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
