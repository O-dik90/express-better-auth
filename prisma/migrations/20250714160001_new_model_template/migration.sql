/*
  Warnings:

  - You are about to drop the `base_proposal` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `frame_proposal` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `master_citation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `master_user_type` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `frame_proposal` DROP FOREIGN KEY `frame_proposal_master_genpro_id_fkey`;

-- DropTable
DROP TABLE `base_proposal`;

-- DropTable
DROP TABLE `frame_proposal`;

-- DropTable
DROP TABLE `master_citation`;

-- DropTable
DROP TABLE `master_user_type`;

-- CreateTable
CREATE TABLE `component_proposal` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `category` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TemplateProposal` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `masterId` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `bab1` JSON NULL,
    `bab2` JSON NULL,
    `bab3` JSON NULL,
    `bab4` JSON NULL,
    `bab5` JSON NULL,
    `luaran` JSON NULL,
    `lampiran` JSON NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `TemplateProposal_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `TemplateProposal` ADD CONSTRAINT `TemplateProposal_masterId_fkey` FOREIGN KEY (`masterId`) REFERENCES `master_genpro`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
