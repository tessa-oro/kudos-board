-- CreateTable
CREATE TABLE "KudosPost" (
    "id" SERIAL NOT NULL,
    "message" TEXT NOT NULL,
    "gif" TEXT NOT NULL,
    "votes" INTEGER NOT NULL,
    "cardId" INTEGER NOT NULL,

    CONSTRAINT "KudosPost_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "KudosPost" ADD CONSTRAINT "KudosPost_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "KudosCard"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
