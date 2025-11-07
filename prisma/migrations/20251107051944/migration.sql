-- CreateTable
CREATE TABLE `agreement` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `id2` BIGINT NOT NULL,
    `posInfo` BOOLEAN NULL,
    `marketing` BOOLEAN NULL,
    `newEvent` BOOLEAN NULL,
    `reviewAns` BOOLEAN NULL,
    `inquiryAns` BOOLEAN NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `food` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(5) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `inquiry` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `content` TEXT NULL,
    `tyoe` INTEGER NULL,
    `inquirer` BIGINT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `inquirypicture` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `inquiry` BIGINT NOT NULL,
    `picture` BIGINT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `mission` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `content` TEXT NULL,
    `point` INTEGER NULL,
    `store` BIGINT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `notice` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `type` INTEGER NULL,
    `receiver` BIGINT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `picture` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `url` VARCHAR(50) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `region` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(10) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rereview` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `content` TEXT NULL,
    `origin` BIGINT NOT NULL,
    `writer` BIGINT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `review` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `store` BIGINT NOT NULL,
    `reviewer` BIGINT NOT NULL,
    `score` DECIMAL(2, 1) NULL,
    `content` TEXT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `reviewpicture` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `review` BIGINT NOT NULL,
    `picture` BIGINT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `store` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `address` VARCHAR(50) NULL,
    `time` VARCHAR(100) NULL,
    `region` BIGINT NOT NULL,
    `owner` BIGINT NOT NULL,
    `name` VARCHAR(20) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `storepicture` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `store` BIGINT NOT NULL,
    `picture` BIGINT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(25) NULL,
    `password` VARCHAR(25) NULL,
    `name` VARCHAR(5) NULL,
    `gender` INTEGER NULL,
    `birth` DATETIME(6) NULL,
    `address` VARCHAR(50) NULL,
    `subaddr` VARCHAR(50) NULL,
    `is_owner` BOOLEAN NULL,
    `created_at` DATETIME(6) NULL,
    `updated_at` DATETIME(6) NULL,
    `point` BIGINT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user-food` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `prefer` BIGINT NOT NULL,
    `user` BIGINT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user-mission` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `isProgress` INTEGER NULL,
    `start_at` DATETIME(6) NULL,
    `user` BIGINT NOT NULL,
    `mission` BIGINT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user-region` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `region` BIGINT NOT NULL,
    `count` INTEGER NULL,
    `user` BIGINT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
