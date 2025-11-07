/*
  Warnings:

  - Added the required column `created_at` to the `rereview` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_at` to the `review` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `rereview` ADD COLUMN `created_at` DATETIME(6) NOT NULL;

-- AlterTable
ALTER TABLE `review` ADD COLUMN `created_at` DATETIME(6) NOT NULL;
