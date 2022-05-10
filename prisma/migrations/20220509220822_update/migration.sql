-- CreateTable
CREATE TABLE "LikeList" (
    "id" SERIAL NOT NULL,
    "profileId" INTEGER,
    "itemId" INTEGER
);

-- CreateTable
CREATE TABLE "Record" (
    "id" SERIAL NOT NULL,
    "profileId" INTEGER,
    "itemId" INTEGER
);

-- CreateIndex
CREATE UNIQUE INDEX "LikeList_id_key" ON "LikeList"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Record_id_key" ON "Record"("id");

-- AddForeignKey
ALTER TABLE "LikeList" ADD CONSTRAINT "LikeList_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LikeList" ADD CONSTRAINT "LikeList_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Record" ADD CONSTRAINT "Record_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Record" ADD CONSTRAINT "Record_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE SET NULL ON UPDATE CASCADE;
