-- CreateEnum
CREATE TYPE "BookStatus" AS ENUM ('Issued', 'Available', 'NotAvailable');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Book" (
    "id" SERIAL NOT NULL,
    "Name" TEXT NOT NULL,
    "AuthorId" INTEGER NOT NULL,
    "PublishedData" INTEGER NOT NULL,
    "ImageUrl" TEXT NOT NULL,
    "Status" "BookStatus" NOT NULL,
    "IssuedBy" INTEGER,
    "IssueDate" TIMESTAMP(3),
    "DueDate" TIMESTAMP(3),

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Author" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Author_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_AuthorId_fkey" FOREIGN KEY ("AuthorId") REFERENCES "Author"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_IssuedBy_fkey" FOREIGN KEY ("IssuedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
