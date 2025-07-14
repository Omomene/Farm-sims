-- PATCH SQL DUMP: Adds Greenhouse (Serre), Reservoir, and Warehouse Structures
-- Date: 2025-07-14
-- Host: localhost    Database: farmstead
-- ------------------------------------------
-- 🪴 Greenhouse (Serre Agricole)
-- ------------------------------------------
DROP TABLE IF EXISTS `greenhouse`;
CREATE TABLE `greenhouse` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Serre Agricole',
  `water_consumption_per_second` INT NOT NULL DEFAULT 15,
  `production_cycle_minutes` INT NOT NULL DEFAULT 5,
  `last_produced_at` DATETIME DEFAULT NULL,
  `strawberry_output_per_cycle` INT NOT NULL DEFAULT 1500,
  `status` VARCHAR(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES `greenhouse` WRITE;
INSERT INTO `greenhouse` 
(`id`, `name`, `water_consumption_per_second`, `production_cycle_minutes`, `last_produced_at`, `strawberry_output_per_cycle`, `status`) 
VALUES 
(1, 'Serre Agricole 1', 15, 5, NOW(), 1500, 'Prête');
UNLOCK TABLES;

-- ------------------------------------------
-- 💧 Reservoir (Réservoir d’Eau)
-- ------------------------------------------
DROP TABLE IF EXISTS `reservoir`;
CREATE TABLE `reservoir` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Réservoir Principal',
  `capacity_liters` INT NOT NULL DEFAULT 20000,
  `current_level_liters` INT NOT NULL DEFAULT 20000,
  `last_refill_time` DATETIME DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES `reservoir` WRITE;
INSERT INTO `reservoir` 
(`id`, `name`, `capacity_liters`, `current_level_liters`, `last_refill_time`) 
VALUES 
(1, 'Réservoir Principal', 20000, 20000, NOW());
UNLOCK TABLES;

-- ------------------------------------------
-- 🏚 Warehouse (Entrepôt)
-- ------------------------------------------
DROP TABLE IF EXISTS `warehouse`;
CREATE TABLE `warehouse` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Entrepôt',
  `capacity_liters` INT NOT NULL DEFAULT 50000,
  `current_load_liters` INT NOT NULL DEFAULT 0,
  `allowed_type` ENUM('processed') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'processed',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES `warehouse` WRITE;
INSERT INTO `warehouse` 
(`id`, `name`, `capacity_liters`, `current_load_liters`, `allowed_type`) 
VALUES 
(1, 'Entrepôt Nord', 50000, 0, 'processed');
UNLOCK TABLES;
