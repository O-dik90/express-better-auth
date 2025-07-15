/*
  Warnings:

  - You are about to drop the `TemplateProposal` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `TemplateProposal` DROP FOREIGN KEY `TemplateProposal_masterId_fkey`;

-- DropTable
DROP TABLE `TemplateProposal`;

-- CreateTable
CREATE TABLE `template_proposal` (
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

    UNIQUE INDEX `template_proposal_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `template_proposal` ADD CONSTRAINT `template_proposal_masterId_fkey` FOREIGN KEY (`masterId`) REFERENCES `master_genpro`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
