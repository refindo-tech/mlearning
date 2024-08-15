/*
  Warnings:

  - Made the column `idsiswa` on table `profilewali` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `profilewali` MODIFY `idsiswa` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `ProfileWali` ADD CONSTRAINT `ProfileWali_idsiswa_fkey` FOREIGN KEY (`idsiswa`) REFERENCES `Siswa`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
