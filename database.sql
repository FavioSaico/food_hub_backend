CREATE DATABASE  IF NOT EXISTS `foodhub` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `foodhub`;
-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: foodhub
-- ------------------------------------------------------
-- Server version	8.0.35

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
-- Table structure for table `comida`
--

DROP TABLE IF EXISTS `comida`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comida` (
  `id_comida` int NOT NULL AUTO_INCREMENT,
  `comida` varchar(100) DEFAULT NULL,
  `tipo_comida` varchar(20) DEFAULT NULL,
  `descripcion` varchar(400) DEFAULT NULL,
  `tiempo` varchar(10) DEFAULT NULL,
  `precio` decimal(10,2) DEFAULT NULL,
  `imagen` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id_comida`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comida`
--

LOCK TABLES `comida` WRITE;
/*!40000 ALTER TABLE `comida` DISABLE KEYS */;
INSERT INTO `comida` VALUES (1,'Ceviche de Pescado','Fondo','Un clasico de la gastronomía peruana. Delicados trozos de pescado fresco, marinados en jugo de limón recién exprimido. El limón sutil peruano tiene características propias y aporta una frescura ácida inigualable. Nuestras cebollas imprimen un sabor marcado e intenso.','20 min',56.00,'assets/imagenes/Ceviche_Pescado.png'),(2,'Arroz con mariscos','Fondo','Junto con el ceviche y la jalea, el arroz con mariscos forma con estos platillos, un trío de delicias marinas más demandadas dentro de la gastronomía peruana. Se conoce que estos sabrosos platos se preparan también en otros países.','30 min',56.00,'assets/imagenes/ARROZ_CON_MARISCOS.png'),(3,'Leche de tigre','Fondo','La leche de tigre es el jugo condimentado resultante del ceviche peruano. Este potaje se volvió protagonista desde la década de los 90, durante esta época los vendedores en los mercados crearon la versión económica del ceviche.','30 min',50.82,'assets/imagenes/LECHE_DE_TIGRE.png');
/*!40000 ALTER TABLE `comida` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `compra`
--

DROP TABLE IF EXISTS `compra`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `compra` (
  `id_compra` int NOT NULL AUTO_INCREMENT,
  `id_usuario` int DEFAULT NULL,
  `id_tipo_compra` int DEFAULT NULL,
  `id_tipo_pago` int DEFAULT NULL,
  `id_estado` int DEFAULT NULL,
  `id_sede` int DEFAULT NULL,
  `costo_subtotal` decimal(10,2) DEFAULT NULL,
  `costo_total` decimal(10,2) DEFAULT NULL,
  `costo_delivery` decimal(10,2) DEFAULT NULL,
  `fecha` datetime DEFAULT NULL,
  PRIMARY KEY (`id_compra`),
  KEY `id_tipo_compra` (`id_tipo_compra`),
  KEY `id_estado` (`id_estado`),
  KEY `id_sede` (`id_sede`),
  KEY `id_usuario` (`id_usuario`),
  KEY `id_tipo_pago` (`id_tipo_pago`),
  CONSTRAINT `compra_ibfk_1` FOREIGN KEY (`id_tipo_compra`) REFERENCES `tipo_compra` (`id_tipo_compra`),
  CONSTRAINT `compra_ibfk_2` FOREIGN KEY (`id_estado`) REFERENCES `estado` (`id_estado`),
  CONSTRAINT `compra_ibfk_3` FOREIGN KEY (`id_sede`) REFERENCES `sede` (`id_sede`),
  CONSTRAINT `compra_ibfk_4` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`),
  CONSTRAINT `compra_ibfk_5` FOREIGN KEY (`id_tipo_pago`) REFERENCES `tipo_pago` (`id_tipo_pago`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `compra`
--

LOCK TABLES `compra` WRITE;
/*!40000 ALTER TABLE `compra` DISABLE KEYS */;
INSERT INTO `compra` VALUES (1,1,1,1,1,1,100.52,20.63,1.52,'2025-02-07 23:46:59'),(2,2,2,2,2,2,101.20,120.00,9.32,'2025-02-07 23:46:59'),(3,6,1,1,3,2,10.20,130.00,9.32,'2025-02-07 23:46:59'),(5,6,2,2,3,1,100.20,110.00,15.66,'2025-02-08 00:06:41'),(6,10,2,1,1,1,112.00,132.00,20.00,'2025-02-16 19:26:46'),(7,10,1,2,1,2,269.64,269.64,0.00,'2025-02-16 20:07:38'),(8,10,1,1,1,1,442.82,442.82,0.00,'2025-02-16 20:16:51'),(9,10,1,1,1,1,168.00,168.00,0.00,'2025-02-16 20:22:48'),(10,10,2,1,1,1,152.46,172.46,20.00,'2025-02-16 20:23:00'),(11,10,1,1,1,1,280.00,280.00,0.00,'2025-02-20 18:32:08'),(12,10,1,1,1,1,101.64,101.64,0.00,'2025-02-20 19:22:43'),(13,10,1,1,1,1,56.00,56.00,0.00,'2025-02-20 21:48:51'),(14,10,1,2,1,1,56.00,56.00,0.00,'2025-02-20 21:55:25'),(15,6,1,2,2,1,264.46,264.46,0.00,'2025-02-23 19:15:22');
/*!40000 ALTER TABLE `compra` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detalle_compra`
--

DROP TABLE IF EXISTS `detalle_compra`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `detalle_compra` (
  `id_compra` int DEFAULT NULL,
  `id_comida` int DEFAULT NULL,
  `cantidad` int DEFAULT NULL,
  `costo` decimal(10,2) DEFAULT NULL,
  KEY `id_compra` (`id_compra`),
  KEY `id_comida` (`id_comida`),
  CONSTRAINT `detalle_compra_ibfk_1` FOREIGN KEY (`id_compra`) REFERENCES `compra` (`id_compra`),
  CONSTRAINT `detalle_compra_ibfk_2` FOREIGN KEY (`id_comida`) REFERENCES `comida` (`id_comida`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detalle_compra`
--

LOCK TABLES `detalle_compra` WRITE;
/*!40000 ALTER TABLE `detalle_compra` DISABLE KEYS */;
INSERT INTO `detalle_compra` VALUES (1,1,5,10.00),(1,2,2,15.00),(2,3,5,60.34),(2,1,1,41.02),(3,3,5,13.34),(3,1,1,80.02),(3,2,8,50.00),(5,2,2,25.34),(5,3,3,100.02),(6,2,2,56.00),(7,2,3,56.00),(7,3,2,50.82),(8,2,4,56.00),(8,1,3,56.00),(8,3,1,50.82),(9,1,3,56.00),(10,3,3,50.82),(11,1,3,56.00),(11,2,2,56.00),(12,3,2,50.82),(13,2,1,56.00),(14,2,1,56.00),(15,3,3,50.82),(15,2,2,56.00);
/*!40000 ALTER TABLE `detalle_compra` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `estado`
--

DROP TABLE IF EXISTS `estado`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `estado` (
  `id_estado` int NOT NULL AUTO_INCREMENT,
  `tipo_estado` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id_estado`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estado`
--

LOCK TABLES `estado` WRITE;
/*!40000 ALTER TABLE `estado` DISABLE KEYS */;
INSERT INTO `estado` VALUES (1,'En proceso'),(2,'Enviado'),(3,'Finalizado');
/*!40000 ALTER TABLE `estado` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reserva`
--

DROP TABLE IF EXISTS `reserva`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reserva` (
  `id_reserva` int NOT NULL AUTO_INCREMENT,
  `id_usuario` int DEFAULT NULL,
  `id_sede` int DEFAULT NULL,
  `id_estado` int DEFAULT NULL,
  `id_zona` int DEFAULT NULL,
  `fecha` datetime DEFAULT NULL,
  `cantidad_personas` int DEFAULT NULL,
  `requerimientos` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id_reserva`),
  KEY `id_usuario` (`id_usuario`),
  KEY `id_sede` (`id_sede`),
  KEY `id_estado` (`id_estado`),
  KEY `id_zona` (`id_zona`),
  CONSTRAINT `reserva_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`),
  CONSTRAINT `reserva_ibfk_2` FOREIGN KEY (`id_sede`) REFERENCES `sede` (`id_sede`),
  CONSTRAINT `reserva_ibfk_3` FOREIGN KEY (`id_estado`) REFERENCES `estado` (`id_estado`),
  CONSTRAINT `reserva_ibfk_4` FOREIGN KEY (`id_zona`) REFERENCES `zona` (`id_zona`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reserva`
--

LOCK TABLES `reserva` WRITE;
/*!40000 ALTER TABLE `reserva` DISABLE KEYS */;
INSERT INTO `reserva` VALUES (1,1,1,3,1,'2025-02-08 16:25:05',4,'Silla para bebé'),(2,2,2,3,2,'2025-02-08 16:25:05',2,'Ninguno'),(13,2,2,1,2,'2025-02-09 18:00:00',3,'Hola mundo'),(18,6,1,1,1,'2025-02-28 17:00:00',2,'nada'),(19,10,2,1,4,'2025-02-27 18:00:00',3,'ninguno'),(20,6,2,1,6,'2025-02-27 05:25:00',2,'Ninguno'),(21,6,2,1,5,'2025-02-27 06:00:00',3,'nada');
/*!40000 ALTER TABLE `reserva` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sede`
--

DROP TABLE IF EXISTS `sede`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sede` (
  `id_sede` int NOT NULL AUTO_INCREMENT,
  `sede` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id_sede`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sede`
--

LOCK TABLES `sede` WRITE;
/*!40000 ALTER TABLE `sede` DISABLE KEYS */;
INSERT INTO `sede` VALUES (1,'C. Armando Blondet 265, San Isidro 15047'),(2,'Av. Aviación 2633, San Borja 15037');
/*!40000 ALTER TABLE `sede` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipo_compra`
--

DROP TABLE IF EXISTS `tipo_compra`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipo_compra` (
  `id_tipo_compra` int NOT NULL AUTO_INCREMENT,
  `tipo_compra` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id_tipo_compra`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo_compra`
--

LOCK TABLES `tipo_compra` WRITE;
/*!40000 ALTER TABLE `tipo_compra` DISABLE KEYS */;
INSERT INTO `tipo_compra` VALUES (1,'Recojo en tienda'),(2,'Delivery');
/*!40000 ALTER TABLE `tipo_compra` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipo_pago`
--

DROP TABLE IF EXISTS `tipo_pago`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipo_pago` (
  `id_tipo_pago` int NOT NULL AUTO_INCREMENT,
  `tipo_pago` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id_tipo_pago`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo_pago`
--

LOCK TABLES `tipo_pago` WRITE;
/*!40000 ALTER TABLE `tipo_pago` DISABLE KEYS */;
INSERT INTO `tipo_pago` VALUES (1,'Efectivo'),(2,'Tarjeta');
/*!40000 ALTER TABLE `tipo_pago` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `id_usuario` int NOT NULL AUTO_INCREMENT,
  `tipo_usuario` varchar(20) DEFAULT NULL,
  `nombre` varchar(50) DEFAULT NULL,
  `correo` varchar(40) DEFAULT NULL,
  `clave` varchar(70) DEFAULT NULL,
  `direccion` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id_usuario`),
  UNIQUE KEY `correo` (`correo`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,'USER','juan','juan@gmail.com','$2a$10$vI7a79EuOfodjvdnZtCBpOoZNM0ntArIXA15B3VdJ8YoH.dOxwEvi','123456789123456'),(2,'USER','jose','joser@gmail.com','$2a$10$aF4SzOb8MPrIQU4ZuQ8HyOoO2r1wUwuhgWG5l3UoVo4hNpCM7iPFy','123456789123456'),(4,'ADMIN','maria','maria@gmail.com','$2a$10$7FnDKbSozrwfBrJsbW7MXOwxsttObPX4zINIXji8JI/nbX09yi24i','123456789123456'),(5,'USER','carlos','carlos@gmail.com','$2a$10$k38j2gsUH21qWtB7ZSHqoOh.itW3Z.pCqq4DO79bqq3yMkln38nHi','123456789123456----'),(6,'USER','Favio','favio@gmail.com','$2a$10$RWxc.mSi0w/1I/HKTHdi0eZrWuVIPcEG4YDqt2bEdH49Jigr27o/C','San Juan de Lurigancho'),(9,'USER','Carlos2','carlos2@gmail.com','$2a$10$6fFmEfkWU0a9tstwPMUg.ukuWvUkUVHwPwt73jfjGzUCDBRSR9aW2','123456789123456----'),(10,'USER','Favio Saico','favio@unmsm.edu.pe','$2a$10$O6A8qauGEoT1wgjyLZMNBup3T1UL5IfsJ5Ko40yQqhkC3JtpvsrNm','1234564');
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `zona`
--

DROP TABLE IF EXISTS `zona`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `zona` (
  `id_zona` int NOT NULL AUTO_INCREMENT,
  `id_sede` int DEFAULT NULL,
  `zona` varchar(20) DEFAULT NULL,
  `imagen` varchar(110) DEFAULT NULL,
  PRIMARY KEY (`id_zona`),
  KEY `id_sede` (`id_sede`),
  CONSTRAINT `zona_ibfk_1` FOREIGN KEY (`id_sede`) REFERENCES `sede` (`id_sede`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `zona`
--

LOCK TABLES `zona` WRITE;
/*!40000 ALTER TABLE `zona` DISABLE KEYS */;
INSERT INTO `zona` VALUES (1,1,'Terraza','assets/imagenes/terraza.png'),(2,1,'Salón Principal','assets/imagenes/salon-principal.png'),(3,1,'Barra','assets/imagenes/barra.png'),(4,2,'Terraza','assets/imagenes/terraza.png'),(5,2,'Salón Principal','assets/imagenes/salon-principal.png'),(6,2,'Barra','assets/imagenes/barra.png');
/*!40000 ALTER TABLE `zona` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-02-24 16:38:41
