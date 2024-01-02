-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "assignedUserId" INTEGER;

-- CreateTable
CREATE TABLE "_AllTasks" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_AllTasks_AB_unique" ON "_AllTasks"("A", "B");

-- CreateIndex
CREATE INDEX "_AllTasks_B_index" ON "_AllTasks"("B");

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_assignedUserId_fkey" FOREIGN KEY ("assignedUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AllTasks" ADD CONSTRAINT "_AllTasks_A_fkey" FOREIGN KEY ("A") REFERENCES "Task"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AllTasks" ADD CONSTRAINT "_AllTasks_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
