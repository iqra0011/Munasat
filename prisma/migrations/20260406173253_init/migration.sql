-- CreateTable
CREATE TABLE "Tender" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "ministry" TEXT NOT NULL,
    "budget" REAL NOT NULL,
    "deadline" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Open',
    "category" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Vendor" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "totalWon" REAL NOT NULL,
    "winRate" REAL NOT NULL,
    "totalAwards" INTEGER NOT NULL,
    "localContent" REAL NOT NULL,
    "topMinistries" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Award" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "vendorId" TEXT NOT NULL,
    "ministry" TEXT NOT NULL,
    "amount" REAL NOT NULL,
    "startDate" TEXT NOT NULL,
    CONSTRAINT "Award_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "Vendor" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "totalBudget" REAL NOT NULL,
    "spentToDate" REAL NOT NULL,
    "activeSubProjects" INTEGER NOT NULL,
    "progressPercent" REAL NOT NULL
);

-- CreateTable
CREATE TABLE "GlobalStat" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "GlobalStat_key_key" ON "GlobalStat"("key");
