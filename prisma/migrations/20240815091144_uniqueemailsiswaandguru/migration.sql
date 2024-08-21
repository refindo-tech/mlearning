/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Guru` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Siswa` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Guru_email_key` ON `Guru`(`email`);

-- CreateIndex
CREATE UNIQUE INDEX `Siswa_email_key` ON `Siswa`(`email`);
