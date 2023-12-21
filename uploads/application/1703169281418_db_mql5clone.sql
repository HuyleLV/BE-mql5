-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 21, 2023 at 11:36 AM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 8.0.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_mql5clone`
--

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `category_id` int(11) NOT NULL,
  `category_name` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `category_description` varchar(1000) COLLATE utf8_unicode_ci DEFAULT NULL,
  `category_link` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `create_at` date DEFAULT NULL,
  `create_by` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`category_id`, `category_name`, `category_description`, `category_link`, `create_at`, `create_by`) VALUES
(1, '213', '13', '', '2023-12-14', 1),
(2, '213', '13', '', '2023-12-14', 1);

-- --------------------------------------------------------

--
-- Table structure for table `categorychild`
--

CREATE TABLE `categorychild` (
  `categoryChild_id` int(11) NOT NULL,
  `categoryChild_name` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `categoryChild_description` varchar(1000) COLLATE utf8_unicode_ci DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `create_at` date DEFAULT NULL,
  `create_by` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `categorychild`
--

INSERT INTO `categorychild` (`categoryChild_id`, `categoryChild_name`, `categoryChild_description`, `category_id`, `create_at`, `create_by`) VALUES
(1, '213', '123', 1, '2023-12-14', 1),
(2, '23113', '341341', 2, '2023-12-14', 1),
(3, '132', '213', 2, '2023-12-14', 1),
(4, '132', '213', 2, '2023-12-14', 1);

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `product_id` int(11) NOT NULL,
  `product_name` varchar(500) COLLATE utf8_unicode_ci DEFAULT NULL,
  `product_slug` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `product_description` varchar(10000) COLLATE utf8_unicode_ci DEFAULT NULL,
  `product_price` int(11) DEFAULT NULL,
  `product_link` varchar(1000) COLLATE utf8_unicode_ci DEFAULT NULL,
  `product_image` varchar(1000) COLLATE utf8_unicode_ci DEFAULT NULL,
  `categoryChild_id` int(11) DEFAULT NULL,
  `product_version` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `product_activations` int(11) DEFAULT NULL,
  `create_at` date DEFAULT NULL,
  `create_by` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`product_id`, `product_name`, `product_slug`, `product_description`, `product_price`, `product_link`, `product_image`, `categoryChild_id`, `product_version`, `product_activations`, `create_at`, `create_by`) VALUES
(1, '12', '2', '3', 3, '5', '4', 5, '5', 5, '2023-12-21', 1);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `displayName` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `photos` varchar(1000) COLLATE utf8_unicode_ci NOT NULL,
  `create_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `displayName`, `email`, `photos`, `create_at`) VALUES
(6, 'huy lê', 'minhuy10a2@gmail.com', 'https://lh3.googleusercontent.com/a/ACg8ocI6fo_ctp9iEvxdP0KfnCMEdCDspc1dEDeOVfD-OLhz=s96-c', '2023-12-18');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`category_id`);

--
-- Indexes for table `categorychild`
--
ALTER TABLE `categorychild`
  ADD PRIMARY KEY (`categoryChild_id`),
  ADD KEY `categorychild_ibfk_1` (`category_id`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`product_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `categorychild`
--
ALTER TABLE `categorychild`
  MODIFY `categoryChild_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `categorychild`
--
ALTER TABLE `categorychild`
  ADD CONSTRAINT `categorychild_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
