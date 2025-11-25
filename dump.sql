-- MySQL dump 10.13  Distrib 8.0.44, for macos15 (arm64)
--
-- Host: 127.0.0.1    Database: concordia_soen_proj
-- ------------------------------------------------------
-- Server version	8.0.44

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `rsc_equipment`
--

DROP TABLE IF EXISTS `rsc_equipment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rsc_equipment` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(250) DEFAULT NULL,
  `location` varchar(250) DEFAULT NULL,
  `available` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rsc_equipment`
--

LOCK TABLES `rsc_equipment` WRITE;
/*!40000 ALTER TABLE `rsc_equipment` DISABLE KEYS */;
INSERT INTO `rsc_equipment` VALUES (1,'Projector A','21 mac',1),(2,'Projector B','22 node',0),(3,'HDMI Cable Set','21 js',1),(4,'Whiteboard Kit','23 mac',1),(5,'Laptop Charger','20 js',0),(6,'Speaker System','22 mac',1),(7,'Microphone Stand','21 node',0),(8,'Webcam Pro','19 js',1),(9,'Laser Pointer','24 mac',1),(10,'Tripod Mount','20 node',0);
/*!40000 ALTER TABLE `rsc_equipment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rsc_labs`
--

DROP TABLE IF EXISTS `rsc_labs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rsc_labs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `available` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rsc_labs`
--

LOCK TABLES `rsc_labs` WRITE;
/*!40000 ALTER TABLE `rsc_labs` DISABLE KEYS */;
INSERT INTO `rsc_labs` VALUES (1,'test3','21 mac',0),(2,'test2','21 js',0),(3,'test2','21 js',0),(4,'test4','22 node',1),(6,'lab_alpha','21 mac',1),(7,'lab_gamma','20 node',1),(8,'lab_delta','23 mac',0),(9,'lab_epsilon','22 python',1),(10,'lab_zeta','21 js',0),(11,'lab_eta','19 mac',0),(12,'lab_theta','20 node',1),(13,'lab_iota','23 js',0),(14,'lab_kappa','24 mac',1),(15,'DIRECT HTTP ROOM','21 jump street',1),(16,'fully customized http room','42 jump street',0);
/*!40000 ALTER TABLE `rsc_labs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rsc_rooms`
--

DROP TABLE IF EXISTS `rsc_rooms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rsc_rooms` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(250) DEFAULT NULL,
  `location` varchar(250) DEFAULT NULL,
  `available` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rsc_rooms`
--

LOCK TABLES `rsc_rooms` WRITE;
/*!40000 ALTER TABLE `rsc_rooms` DISABLE KEYS */;
INSERT INTO `rsc_rooms` VALUES (1,'Study Room Alpha','21 mac',1),(2,'Study Room Beta','21 js',0),(3,'Study Room Gamma','22 node',1),(4,'Study Room Delta','20 mac',0),(5,'Study Room Epsilon','23 python',1),(6,'Study Room Zeta','24 js',0),(7,'Study Room Eta','25 mac',0),(8,'Study Room Theta','20 node',1),(9,'Study Room Iota','19 js',1),(10,'Study Room Kappa','22 mac',0);
/*!40000 ALTER TABLE `rsc_rooms` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-11-25 15:03:43
