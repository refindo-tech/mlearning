/*
  Warnings:

  - Made the column `idguru` on table `profileguru` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `profileguru` MODIFY `idguru` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `ProfileSiswa` ADD CONSTRAINT `ProfileSiswa_idsiswa_fkey` FOREIGN KEY (`idsiswa`) REFERENCES `Siswa`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProfileGuru` ADD CONSTRAINT `ProfileGuru_idguru_fkey` FOREIGN KEY (`idguru`) REFERENCES `Guru`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
