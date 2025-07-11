-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: localhost    Database: farmstead
-- ------------------------------------------------------
-- Server version	8.0.41

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `crops`
--

DROP TABLE IF EXISTS `crops`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `crops` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `base_yield` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `crops`
--

LOCK TABLES `crops` WRITE;
/*!40000 ALTER TABLE `crops` DISABLE KEYS */;
INSERT INTO `crops` VALUES (1,'Blé',1000),(2,'Orge',1000),(3,'Canola',1000),(4,'Tournesol',3000),(5,'Pomme de terre',5000),(6,'Olive',1500),(7,'Canne à sucre',5000),(8,'Betterave',3500),(9,'Coton',750),(10,'Peuplier',1500);
/*!40000 ALTER TABLE `crops` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `factories`
--

DROP TABLE IF EXISTS `factories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `factories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `resources` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `stock` int NOT NULL,
  `stock_unit` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT 'L',
  `production` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `time_remaining` int NOT NULL DEFAULT '0',
  `status_message` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `factories`
--

LOCK TABLES `factories` WRITE;
/*!40000 ALTER TABLE `factories` DISABLE KEYS */;
INSERT INTO `factories` VALUES (1,'Moulin à grain (blé)','Blé',2000,'L','Farine',0,NULL),(2,'Moulin à grain (orge)','Orge',18,'L','Farine',0,NULL),(3,'Moulin à huile (canola)','Canola',10,'L','Huile',0,NULL),(4,'Moulin à huile (tournesol)','Tournesol',8,'L','Huile',0,NULL),(5,'Moulin à huile (olive)','Olive',10,'L','Huile',0,NULL),(6,'Usine de chips','Pomme de terre + Huile',50,'L','Chips',0,'Stockage plein'),(7,'Raffinerie canne à sucre','Canne à sucre',25,'L','Sucre',0,NULL),(8,'Raffinerie betterave','Betterave',20,'L','Sucre',0,NULL),(9,'Filature','Coton',40,'L','Tissu',0,NULL),(10,'Atelier de couture','Tissu',8,'L','Vêtements',0,NULL),(11,'Scierie','Peuplier',1600,'L','Planches',16,NULL),(12,'Fabrique de wagons','Planches',15,'L','Wagons',0,NULL),(13,'Usine de jouets','Planches',5,'L','Jouets',0,NULL),(14,'Boulangerie','Farine + Sucre',7,'L','Gâteau',0,NULL);
/*!40000 ALTER TABLE `factories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fields`
--

DROP TABLE IF EXISTS `fields`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fields` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `crop_id` int DEFAULT NULL,
  `state` enum('harvested','plowed','sown','fertilized','ready') COLLATE utf8mb4_unicode_ci DEFAULT 'harvested',
  `last_action_time` datetime DEFAULT NULL,
  `remaining` int DEFAULT '0',
  `busy` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `crop_id` (`crop_id`),
  CONSTRAINT `fields_ibfk_1` FOREIGN KEY (`crop_id`) REFERENCES `crops` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fields`
--

LOCK TABLES `fields` WRITE;
/*!40000 ALTER TABLE `fields` DISABLE KEYS */;
INSERT INTO `fields` VALUES (1,'Field Wheat 1',1,'sown','2025-07-10 20:44:05',0,0),(2,'Field Barley 1',2,'plowed','2025-07-10 20:44:05',0,0),(3,'Field Canola 1',3,'fertilized','2025-07-10 20:44:05',0,0),(4,'Field Sunflower 1',NULL,'harvested','2025-07-10 20:44:05',0,0),(5,'Field Potato 1',5,'harvested','2025-07-10 20:44:05',0,0),(6,'Champ 6',NULL,'harvested',NULL,0,0),(7,'Champ NaN',NULL,'harvested',NULL,0,0),(8,'Champ NaN',NULL,'harvested',NULL,0,0),(9,'Champ 9',NULL,'harvested',NULL,0,0),(10,'Champ NaN',NULL,'harvested',NULL,0,0),(11,'Champ NaN',NULL,'harvested',NULL,0,0),(12,'Champ NaN',NULL,'harvested',NULL,0,0),(13,'Champ NaN',NULL,'harvested',NULL,0,0),(14,'Champ NaN',NULL,'harvested',NULL,0,0),(15,'Champ NaN',NULL,'harvested',NULL,0,0);
/*!40000 ALTER TABLE `fields` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `machines`
--

DROP TABLE IF EXISTS `machines`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `machines` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `type` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `status` enum('Disponible','Occupé') COLLATE utf8mb4_general_ci DEFAULT 'Disponible',
  `assigned_to` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `next_availability` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `machines`
--

LOCK TABLES `machines` WRITE;
/*!40000 ALTER TABLE `machines` DISABLE KEYS */;
INSERT INTO `machines` VALUES (1,'Tracteur 1','Tracteur','Disponible',NULL,'2025-07-11 00:05:39'),(2,'Tracteur 2','Tracteur','Disponible',NULL,'2025-07-11 00:05:39'),(3,'Tracteur 3','Tracteur','Disponible',NULL,'2025-07-11 00:05:39'),(4,'Tracteur 4','Tracteur','Disponible',NULL,'2025-07-11 00:05:39'),(5,'Tracteur 5','Tracteur','Disponible',NULL,'2025-07-11 00:05:39'),(6,'Semeuse 1','Semeuse','Disponible',NULL,'2025-07-11 00:05:39'),(7,'Semeuse 2','Semeuse','Disponible',NULL,'2025-07-11 00:05:39'),(8,'Moissonneuse-batteuse 1','Moissonneuse','Disponible',NULL,'2025-07-11 00:05:39'),(9,'Moissonneuse-batteuse 2','Moissonneuse','Disponible',NULL,'2025-07-11 00:05:39'),(10,'Remorque standard 1','Remorque standard','Disponible',NULL,'2025-07-11 00:05:39'),(11,'Remorque standard 2','Remorque standard','Disponible',NULL,'2025-07-11 00:05:39'),(12,'Remorque standard 3','Remorque standard','Disponible',NULL,'2025-07-11 00:05:39'),(13,'Planteuse pomme de terre','Planteuse spécialisée','Disponible',NULL,'2025-07-11 00:05:39'),(14,'Planteuse canne à sucre','Planteuse spécialisée','Disponible',NULL,'2025-07-11 00:05:39'),(15,'Planteuse arbre','Planteuse spécialisée','Disponible',NULL,'2025-07-11 00:05:39'),(16,'Moissonneuse olive','Moissonneuse spécialisée','Disponible',NULL,'2025-07-11 00:05:39'),(17,'Moissonneuse canne à sucre','Moissonneuse spécialisée','Disponible',NULL,'2025-07-11 00:05:39'),(18,'Moissonneuse betterave','Moissonneuse spécialisée','Disponible',NULL,'2025-07-11 00:05:39'),(19,'Moissonneuse coton','Moissonneuse spécialisée','Disponible',NULL,'2025-07-11 00:05:39'),(20,'Moissonneuse arbre','Moissonneuse spécialisée','Disponible',NULL,'2025-07-11 00:05:39'),(21,'Remorque semi','Remorque semi','Disponible',NULL,'2025-07-11 00:05:39');
/*!40000 ALTER TABLE `machines` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `storage`
--

DROP TABLE IF EXISTS `storage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `storage` (
  `id` int NOT NULL AUTO_INCREMENT,
  `item_name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `quantity` int DEFAULT '0',
  `item_type` enum('harvested','processed') COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `storage`
--

LOCK TABLES `storage` WRITE;
/*!40000 ALTER TABLE `storage` DISABLE KEYS */;
INSERT INTO `storage` VALUES (4,'Tournesol',9001,'harvested'),(5,'Pomme de terre',12000,'harvested'),(6,'Olive',7000,'harvested'),(7,'Canne à sucre',11000,'harvested'),(8,'Betterave',9000,'harvested'),(9,'Coton',4000,'harvested'),(10,'Peuplier',5000,'harvested'),(11,'Farine',0,'processed'),(12,'Huile',0,'processed'),(13,'Chips',0,'processed'),(14,'Sucre',0,'processed'),(15,'Tissu',0,'processed'),(16,'Vêtements',0,'processed'),(17,'Wagons',0,'processed'),(18,'Jouets',0,'processed');
/*!40000 ALTER TABLE `storage` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-07-11 10:22:35
