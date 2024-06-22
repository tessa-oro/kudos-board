-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_postId_fkey";

-- DropForeignKey
ALTER TABLE "KudosPost" DROP CONSTRAINT "KudosPost_cardId_fkey";

-- AddForeignKey
ALTER TABLE "KudosPost" ADD CONSTRAINT "KudosPost_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "KudosCard"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "KudosPost"("id") ON DELETE CASCADE ON UPDATE CASCADE;
