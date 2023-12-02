-- DropForeignKey
ALTER TABLE "WorldPost" DROP CONSTRAINT "WorldPost_parentPostId_fkey";

-- AddForeignKey
ALTER TABLE "WorldPost" ADD CONSTRAINT "WorldPost_parentPostId_fkey" FOREIGN KEY ("parentPostId") REFERENCES "WorldPost"("id") ON DELETE CASCADE ON UPDATE CASCADE;
