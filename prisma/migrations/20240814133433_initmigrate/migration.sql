-- CreateTable
CREATE TABLE `Siswa` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(120) NOT NULL,
    `password` VARCHAR(120) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Guru` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(120) NOT NULL,
    `password` VARCHAR(120) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProfileSiswa` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idsiswa` INTEGER NOT NULL,
    `nisn` VARCHAR(30) NULL,
    `name` VARCHAR(120) NOT NULL,
    `sekolah` VARCHAR(120) NULL,
    `kelas` VARCHAR(10) NULL,
    `tempatlahir` VARCHAR(120) NULL,
    `tanggallahir` DATETIME(3) NULL,
    `gender` ENUM('Pria', 'Perempuan') NULL,
    `agama` VARCHAR(20) NULL,
    `phone` VARCHAR(191) NULL,
    `anakke` INTEGER NULL,
    `alamat` TEXT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProfileWali` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idsiswa` VARCHAR(191) NULL,
    `name` VARCHAR(150) NOT NULL,
    `pekerjaan` VARCHAR(120) NULL,
    `phone` VARCHAR(191) NULL,
    `alamat` TEXT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Profileguru` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idguru` VARCHAR(191) NULL,
    `nuptk` VARCHAR(191) NULL,
    `start` DATETIME(3) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MataPelajaran` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idguru` VARCHAR(191) NULL,
    `name` VARCHAR(120) NULL,
    `kelas` VARCHAR(10) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Absensi` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idmatapelajaran` INTEGER NULL,
    `idmateri` INTEGER NULL,
    `idsiswa` INTEGER NULL,
    `name` VARCHAR(150) NULL,
    `nisn` VARCHAR(30) NULL,
    `kelas` VARCHAR(10) NULL,
    `matapelajaran` VARCHAR(120) NULL,
    `status` ENUM('BELUM', 'SUDAH') NOT NULL DEFAULT 'BELUM',
    `date` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
