-- CreateTable
CREATE TABLE "User" (
    "email" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Volunteer" (
    "email" TEXT NOT NULL PRIMARY KEY,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "phoneNumber" TEXT
);

-- CreateTable
CREATE TABLE "Donor" (
    "email" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL DEFAULT 'anonymous',
    "amount" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Volunteer_email_key" ON "Volunteer"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Donor_email_key" ON "Donor"("email");
