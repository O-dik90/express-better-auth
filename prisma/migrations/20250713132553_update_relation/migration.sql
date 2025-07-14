/*
  Warnings:

  - Added the required column `master_genpro_id` to the `frame_proposal` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `frame_proposal` ADD COLUMN `master_genpro_id` VARCHAR(191) NOT NULL,
    MODIFY `detail` JSON NULL;

-- AddForeignKey
ALTER TABLE `frame_proposal` ADD CONSTRAINT `frame_proposal_master_genpro_id_fkey` FOREIGN KEY (`master_genpro_id`) REFERENCES `master_genpro`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
