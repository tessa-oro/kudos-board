-- CreateTable
CREATE TABLE "KudosCard" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "author" TEXT NOT NULL,

    CONSTRAINT "KudosCard_pkey" PRIMARY KEY ("id")
);
