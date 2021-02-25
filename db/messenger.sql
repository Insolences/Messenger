-- MySQL dump 10.13  Distrib 8.0.23, for Linux (x86_64)
--
-- Host: localhost    Database: messenger
-- ------------------------------------------------------
-- Server version	8.0.23-0ubuntu0.20.04.1

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
-- Table structure for table `SequelizeMeta`
--

DROP TABLE IF EXISTS `SequelizeMeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `SequelizeMeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SequelizeMeta`
--

LOCK TABLES `SequelizeMeta` WRITE;
/*!40000 ALTER TABLE `SequelizeMeta` DISABLE KEYS */;
INSERT INTO `SequelizeMeta` VALUES ('20210212144908-create-user.js'),('20210212145012-create-message.js'),('20210212145214-create-chat.js'),('20210212145315-create-user-chat.js');
/*!40000 ALTER TABLE `SequelizeMeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chats`
--

DROP TABLE IF EXISTS `chats`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chats` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `type` enum('private','public') DEFAULT NULL,
  `owner_id` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=129 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chats`
--

LOCK TABLES `chats` WRITE;
/*!40000 ALTER TABLE `chats` DISABLE KEYS */;
INSERT INTO `chats` VALUES (103,'Новая группа','public',NULL,'2021-02-22 09:28:45','2021-02-22 09:28:45'),(105,NULL,'private',NULL,'2021-02-22 17:56:14','2021-02-22 17:56:14'),(108,'ddddd','public',NULL,'2021-02-23 08:25:53','2021-02-23 08:25:53'),(113,'Новая группа','public',NULL,'2021-02-23 10:03:59','2021-02-23 10:03:59'),(122,NULL,'private',NULL,'2021-02-23 12:41:03','2021-02-23 12:41:03'),(123,'Новая группа','public',NULL,'2021-02-23 12:41:08','2021-02-23 12:41:08'),(125,'Новая группа','public',NULL,'2021-02-24 09:27:28','2021-02-24 09:27:28'),(128,NULL,'private',NULL,'2021-02-24 13:16:34','2021-02-24 13:16:34');
/*!40000 ALTER TABLE `chats` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `messages`
--

DROP TABLE IF EXISTS `messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `messages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `chat_id` int DEFAULT NULL,
  `sender_id` int DEFAULT NULL,
  `text` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=345 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messages`
--

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
INSERT INTO `messages` VALUES (331,118,14,'рлорлор','2021-02-23 10:36:06','2021-02-23 10:36:06'),(332,123,14,'вфывфыв','2021-02-23 12:47:19','2021-02-23 12:47:19'),(333,122,14,'фывфывфы','2021-02-23 12:47:22','2021-02-23 12:47:22'),(334,121,14,'вфывфывф','2021-02-23 12:47:24','2021-02-23 12:47:24'),(335,121,13,'dasdasd','2021-02-24 08:14:44','2021-02-24 08:14:44'),(336,121,13,'dasds','2021-02-24 08:15:39','2021-02-24 08:15:39'),(337,121,13,'dasd','2021-02-24 08:19:20','2021-02-24 08:19:20'),(338,121,13,'вфы','2021-02-24 09:48:17','2021-02-24 09:48:17'),(339,121,13,'в','2021-02-24 09:48:17','2021-02-24 09:48:17'),(340,121,13,'фыв','2021-02-24 09:48:17','2021-02-24 09:48:17'),(341,121,13,'фы','2021-02-24 09:48:17','2021-02-24 09:48:17'),(342,121,13,'в','2021-02-24 09:48:17','2021-02-24 09:48:17'),(343,121,13,'фыв','2021-02-24 09:48:18','2021-02-24 09:48:18'),(344,121,13,'д','2021-02-24 09:54:32','2021-02-24 09:54:32');
/*!40000 ALTER TABLE `messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_chats`
--

DROP TABLE IF EXISTS `user_chats`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_chats` (
  `chat_id` int NOT NULL,
  `user_id` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`chat_id`,`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_chats`
--

LOCK TABLES `user_chats` WRITE;
/*!40000 ALTER TABLE `user_chats` DISABLE KEYS */;
INSERT INTO `user_chats` VALUES (103,17,'2021-02-22 09:28:45','2021-02-22 09:28:45'),(103,18,'2021-02-22 09:28:45','2021-02-22 09:28:45'),(103,19,'2021-02-22 09:28:45','2021-02-22 09:28:45'),(105,11,'2021-02-22 17:56:14','2021-02-22 17:56:14'),(105,15,'2021-02-22 17:56:14','2021-02-22 17:56:14'),(108,16,'2021-02-23 08:25:53','2021-02-23 08:25:53'),(108,19,'2021-02-23 08:25:53','2021-02-23 08:25:53'),(113,16,'2021-02-23 10:03:59','2021-02-23 10:03:59'),(113,17,'2021-02-23 10:03:59','2021-02-23 10:03:59'),(113,18,'2021-02-23 10:03:59','2021-02-23 10:03:59'),(113,19,'2021-02-23 10:03:59','2021-02-23 10:03:59'),(113,20,'2021-02-23 10:03:59','2021-02-23 10:03:59'),(122,11,'2021-02-23 12:41:03','2021-02-23 12:41:03'),(122,14,'2021-02-23 12:41:03','2021-02-23 12:41:03'),(123,14,'2021-02-23 12:41:08','2021-02-23 12:41:08'),(123,16,'2021-02-23 12:41:08','2021-02-23 12:41:08'),(123,17,'2021-02-23 12:41:08','2021-02-23 12:41:08'),(123,18,'2021-02-23 12:41:08','2021-02-23 12:41:08'),(125,16,'2021-02-24 09:27:28','2021-02-24 09:27:28'),(125,18,'2021-02-24 09:27:28','2021-02-24 09:27:28'),(125,20,'2021-02-24 09:27:28','2021-02-24 09:27:28'),(128,13,'2021-02-24 13:16:34','2021-02-24 13:16:34'),(128,15,'2021-02-24 13:16:34','2021-02-24 13:16:34');
/*!40000 ALTER TABLE `user_chats` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `login` varchar(255) DEFAULT NULL,
  `nickname` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `is_admin` tinyint(1) DEFAULT '0',
  `is_blocked` tinyint(1) DEFAULT '0',
  `read_only` tinyint(1) DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (11,'newuser','newuser','$2b$10$3SZZ7YMWHFHJnSpF6CTz9uSxfxGm51zc56QkG5hmpa0.R.e8AzPbi','test@email.com',0,0,0,'2021-02-18 13:24:46','2021-02-24 13:15:47'),(12,'tester','tester','$2b$10$FMjxEgrQawO.XfRtN5ISIux5RYx9yvd1lEbdH2tzRtvBliQaABW9y','test@email.com',0,0,0,'2021-02-18 13:24:55','2021-02-24 13:15:47'),(13,'yujinwork19_google','yujinwork_g22','$2b$10$mAgHYfMMzesSbcCENAe0iO4wk0pAGJ7LWLRTMcwkN/CU9QlmaUdI.','yujinwork19@gmail.com',1,0,0,'2021-02-18 13:25:01','2021-02-24 13:15:47'),(14,'Yujin','Yujin','$2b$10$3SZZ7YMWHFHJnSpF6CTz9uSxfxGm51zc56QkG5hmpa0.R.e8AzPbi','test@email.com',1,0,0,'2021-02-18 13:25:16','2021-02-24 13:15:47'),(15,'Nick','Nick','$2b$10$3SZZ7YMWHFHJnSpF6CTz9uSxfxGm51zc56QkG5hmpa0.R.e8AzPbi','test@email.com',1,0,0,'2021-02-18 13:25:16','2021-02-24 13:15:47'),(16,'John','John','$2b$10$3SZZ7YMWHFHJnSpF6CTz9uSxfxGm51zc56QkG5hmpa0.R.e8AzPbi','test@email.com',0,0,0,'2021-02-18 13:25:16','2021-02-24 13:15:47'),(17,'Steven','Steven','$2b$10$3SZZ7YMWHFHJnSpF6CTz9uSxfxGm51zc56QkG5hmpa0.R.e8AzPbi','test@email.com',0,0,0,'2021-02-18 13:25:16','2021-02-24 13:15:47'),(18,'Sonya','Sonya','$2b$10$3SZZ7YMWHFHJnSpF6CTz9uSxfxGm51zc56QkG5hmpa0.R.e8AzPbi','test@email.com',0,0,0,'2021-02-18 13:25:16','2021-02-24 13:15:47'),(19,'Avatar','Avatar','$2b$10$3SZZ7YMWHFHJnSpF6CTz9uSxfxGm51zc56QkG5hmpa0.R.e8AzPbi','test@email.com',0,0,0,'2021-02-18 13:25:16','2021-02-24 13:15:47'),(20,'Sky','Sky','$2b$10$3SZZ7YMWHFHJnSpF6CTz9uSxfxGm51zc56QkG5hmpa0.R.e8AzPbi','test@email.com',0,0,0,'2021-02-18 13:25:16','2021-02-24 13:15:47'),(21,'Oleg','Oleg','$2b$10$MHQ6OmgvLWDsSVItNNxMdOkSH39z6RJHvOxht4TvkYJ4NKckr6SYS','oleg@gmail.com',1,0,0,'2021-02-22 14:43:12','2021-02-22 14:43:12'),(22,'pavel','pavel','$2b$10$XYvL3en4EdvEw0lvGJldYu2HdQvEGJTcprztiKaFjhjzo6GY1.jwW','test@email.com',1,0,0,'2021-02-22 14:44:51','2021-02-22 14:44:51');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-02-24 15:27:21
