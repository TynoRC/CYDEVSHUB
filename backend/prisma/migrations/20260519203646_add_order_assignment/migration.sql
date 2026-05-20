-- AlterTable
ALTER TABLE "Order" ADD COLUMN "assignedDeveloperEmail" TEXT;
ALTER TABLE "Order" ADD COLUMN "assignedDeveloperName" TEXT;
ALTER TABLE "Order" ADD COLUMN "developerCut" REAL;
ALTER TABLE "Order" ADD COLUMN "paymentIban" TEXT;
ALTER TABLE "Order" ADD COLUMN "price" REAL;
