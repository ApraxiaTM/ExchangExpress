-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 26, 2024 at 04:45 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `exchangeexpress`
--

-- --------------------------------------------------------

--
-- Table structure for table `bank_account`
--

CREATE TABLE `bank_account` (
  `id` int(11) NOT NULL,
  `bankname` varchar(255) DEFAULT NULL,
  `currency` varchar(255) DEFAULT NULL,
  `holder` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `transfer_code` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `bank_account`
--

INSERT INTO `bank_account` (`id`, `bankname`, `currency`, `holder`, `country`, `transfer_code`) VALUES
(2, 'OCBC Bank', 'IDR', 'Winston NK', 'Indonesia', '8294839813'),
(3, 'Bank Mandiri', 'IDR', 'Timothy', 'Indonesia', '1920389201'),
(4, 'Bank BTPN', 'IDR', 'JamesPurnama', 'Indonesia', '2891024378'),
(62, 'Japanese Bank', 'USD', 'Donald Trump', 'United States of America', '7328127843'),
(77, 'Bank BCA', 'IDR', 'Istaroth', 'Indonesia', '1029380028'),
(79, 'Singaporean Bank', 'SGD', 'Da Wei', 'Singapore', '9029103421'),
(84, 'Bank BCA', 'IDR', 'Winston Narada Kusumahadi', 'Indonesia', '2791989281'),
(86, 'Japanese Bank', 'JPY', 'Muichiro', 'Japan', '12819290812'),
(87, 'Bank BCA', 'IDR', 'James Purnama', 'Indonesia', '1820392011'),
(88, 'Bank BCA', 'IDR', 'Alif Satria Adhi', 'Indonesia', '1728192891'),
(89, 'Bank BCA', 'IDR', 'Kevin Christofer Lim', 'Indonesia', '7219372989'),
(92, 'Singaporean Bank', 'SGD', 'Uncle Roger', 'Singapore', '1829482929'),
(93, 'Bank BCA', 'IDR', 'Aldi Putra', 'Indonesia', '1929838298'),
(95, 'Bank BCA', 'IDR', 'Wilbert', 'Indonesia', '182983922'),
(96, 'Deutsche Bank', 'EUR', 'Sebastian Koenig', 'Germany', '190283922'),
(97, 'Bank Mandiri', 'IDR', 'Joseph Andreas', 'Indonesia', '8918292912'),
(98, 'ABC Bank', 'EUR', 'Gordon Ramsay', 'Zimbabwe', '1829182919'),
(99, 'Deutsche Bank', 'EUR', 'Alif Adhi', 'Germany', '278392939'),
(100, 'Bank BCA', 'IDR', 'Patricia', 'Indonesia', '1398128239'),
(112, 'Bank BCA', 'IDR', 'Ignatius Kennard', 'Indonesia', '919029890'),
(113, 'Bank BCA', 'IDR', 'Istaroth', 'Indonesia', '237178738'),
(115, 'Bank Mandiri', 'IDR', 'Randy Anthony', 'Indonesia', '7219381981');

-- --------------------------------------------------------

--
-- Table structure for table `currency`
--

CREATE TABLE `currency` (
  `id` int(11) NOT NULL,
  `currency` varchar(3) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `id_amount` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `currency`
--

INSERT INTO `currency` (`id`, `currency`, `country`, `id_amount`) VALUES
(1, 'USD', 'United States of America', 16045.00),
(2, 'JPY', 'Japan', 102.98),
(3, 'EUR', 'Euro', 17311.72),
(4, 'GBP', 'Great Britain', 20189.14),
(5, 'SGD', 'Singapore', 11846.25),
(6, 'KRW', 'South Korea', 11.84),
(7, 'MYR', 'Malaysia', 3402.64),
(11, 'IDR', 'Indonesia', 1.00),
(12, 'CNY', 'China', 2256.34);

-- --------------------------------------------------------

--
-- Table structure for table `transactions`
--

CREATE TABLE `transactions` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `users_account_id` int(11) DEFAULT NULL,
  `currency` varchar(10) DEFAULT NULL,
  `amount` decimal(10,2) DEFAULT NULL,
  `rate_conversion` decimal(10,2) DEFAULT NULL,
  `timestamps` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `admin_fee` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `transactions`
--

INSERT INTO `transactions` (`id`, `user_id`, `users_account_id`, `currency`, `amount`, `rate_conversion`, `timestamps`, `admin_fee`) VALUES
(1, 2, 4, 'IDR', 700000.00, 1.00, '2024-05-26 16:49:13', 2500.00),
(3, 7, 5, 'IDR', 700000.00, 1.00, '2024-05-28 01:28:02', 2500.00),
(4, 2, 68, 'SGD', 798200.00, 0.60, '2024-06-12 01:26:48', 10000.00),
(5, 2, 75, 'JPY', 2000.00, 102.98, '2024-06-20 08:48:08', 10000.00),
(6, 2, 68, 'SGD', 2000.00, 11846.25, '2024-06-20 08:52:20', 10000.00),
(7, 2, 61, 'USD', 5000.00, 16050.00, '2024-06-20 08:52:56', 10000.00),
(8, 2, 76, 'IDR', 10000000.00, 1.00, '2024-06-20 08:55:03', 2500.00),
(9, 34, 82, 'IDR', 800000.00, 1.00, '2024-06-20 14:31:29', 2500.00),
(10, 34, 82, 'IDR', 9000.00, 1.00, '2024-06-20 14:34:53', 2500.00),
(11, 34, 82, 'IDR', 32342.00, 1.00, '2024-06-20 14:43:55', 2500.00),
(12, 34, 82, 'IDR', 900000.00, 1.00, '2024-06-20 14:49:12', 2500.00),
(13, 34, 82, 'IDR', 281020.00, 1.00, '2024-06-20 14:50:01', 2500.00),
(14, 34, 84, 'IDR', 1832928.00, 1.00, '2024-06-20 14:50:11', 2500.00),
(15, 34, 81, 'SGD', 81029.00, 11846.25, '2024-06-20 14:51:27', 10000.00),
(16, 34, 85, 'EUR', 719219.00, 17311.72, '2024-06-20 14:52:38', 10000.00),
(17, 34, 85, 'EUR', 98000.00, 17311.72, '2024-06-20 15:01:35', 10000.00),
(18, 34, 84, 'IDR', 900000.00, 1.00, '2024-06-21 01:31:21', 2500.00),
(19, 34, 82, 'IDR', 4553.00, 1.00, '2024-06-21 02:07:24', 2500.00),
(20, 34, 85, 'EUR', 7000.00, 17311.72, '2024-06-21 02:07:57', 10000.00),
(21, 35, 88, 'EUR', 10000.00, 17311.72, '2024-06-21 02:21:45', 10000.00),
(32, 2, 76, 'IDR', 900000.00, 1.00, '2024-06-25 23:19:24', 2500.00),
(33, 2, 68, 'SGD', 800000.00, 11846.25, '2024-06-25 23:20:16', 10000.00),
(34, 2, 76, 'IDR', 72899.00, 1.00, '2024-06-26 01:51:57', 2500.00),
(35, 2, 75, 'JPY', 100000.00, 102.98, '2024-06-26 01:52:11', 10000.00);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `pass` varchar(65) DEFAULT NULL,
  `salt` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `pass`, `salt`) VALUES
(2, 'synthesis', 'synthesia@gmail.com', '$2b$10$NBbJZnuN4rGC/o6hlrO94OFLrUlt951/cfhMbk4plkMEdmDVlPOCm', '$2b$10$NBbJZnuN4rGC/o6hlrO94O'),
(7, 'james', 'james@gmail.com', '$2b$10$Tpf13ftTP0RcINofiSrDPekQTnWEq7yqiqYtlX83sNisreO/K3SOS', '$2b$10$Tpf13ftTP0RcINofiSrDPe'),
(26, 'istaroth', 'istaroth@gmail.com', '$2b$10$N.L2cGEtngsXw3d6kCXQvet5wk6uyr955xAn2/FLa1mi5sITl9xg6', '$2b$10$N.L2cGEtngsXw3d6kCXQve'),
(32, 'winston', 'winstonnk@gmail.com', '$2b$10$3yxy.vt0IYeaCpg/5h0myOr6hOsNJu/YMj5ZOMWU0oymokH.vw8NS', '$2b$10$3yxy.vt0IYeaCpg/5h0myO'),
(33, 'lalalalala', 'alif@gmail.com', '$2b$10$vHYOSBD8zzhJT48l2MOgVevoejwETuymHmWpWjgBOxWn16l24kdGS', '$2b$10$vHYOSBD8zzhJT48l2MOgVe'),
(34, 'shadow7530', 'shadow@gmail.com', '$2b$10$5Hat69yCPJLaoaXI9eRuiO7Lt37jOne3kDWrcBxT6G2AdV8QQvkDi', '$2b$10$5Hat69yCPJLaoaXI9eRuiO'),
(35, 'joseph', 'andreas@yahoo.com', '$2b$10$a/0exQSLidFPMhSZWgDgJ.1/kGN5/8Y2pE2fCjnq0SoxanQJGX436', '$2b$10$a/0exQSLidFPMhSZWgDgJ.'),
(37, 'kennardlim', 'kennardlim@gmail.com', '$2a$10$KxCruqfl.nk1V6IQN60l5.HMeUwOA.e7wrDVfVPAFxvlNLJ65XU2m', ''),
(38, 'anthony', 'randy@gmail.com', '$2a$10$qV/Ac.jL.OnFGPloM1zSSO5VR2gyoMk3b79bwWjwmpYg7YR4b3YUy', '');

-- --------------------------------------------------------

--
-- Table structure for table `users_account`
--

CREATE TABLE `users_account` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `bank_id` int(11) DEFAULT NULL,
  `status` enum('sender','receiver') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users_account`
--

INSERT INTO `users_account` (`id`, `user_id`, `bank_id`, `status`) VALUES
(2, 2, 2, 'sender'),
(4, 2, 3, 'receiver'),
(5, 7, 4, 'sender'),
(61, 2, 62, 'receiver'),
(66, 26, 77, 'sender'),
(68, 2, 79, 'receiver'),
(73, 32, 84, 'sender'),
(75, 2, 86, 'receiver'),
(76, 2, 87, 'receiver'),
(77, 33, 88, 'sender'),
(78, 34, 89, 'sender'),
(81, 34, 92, 'receiver'),
(82, 34, 93, 'receiver'),
(84, 34, 95, 'receiver'),
(85, 34, 96, 'receiver'),
(86, 35, 97, 'sender'),
(87, 35, 98, 'receiver'),
(88, 35, 99, 'receiver'),
(89, 35, 100, 'receiver'),
(94, 37, 112, 'sender'),
(95, 37, 113, 'receiver'),
(97, 38, 115, 'sender');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bank_account`
--
ALTER TABLE `bank_account`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `currency`
--
ALTER TABLE `currency`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `users_account_id` (`users_account_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users_account`
--
ALTER TABLE `users_account`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `bank_id` (`bank_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bank_account`
--
ALTER TABLE `bank_account`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=116;

--
-- AUTO_INCREMENT for table `currency`
--
ALTER TABLE `currency`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `transactions`
--
ALTER TABLE `transactions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT for table `users_account`
--
ALTER TABLE `users_account`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=98;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `transactions`
--
ALTER TABLE `transactions`
  ADD CONSTRAINT `transactions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `transactions_ibfk_2` FOREIGN KEY (`users_account_id`) REFERENCES `users_account` (`id`);

--
-- Constraints for table `users_account`
--
ALTER TABLE `users_account`
  ADD CONSTRAINT `users_account_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `users_account_ibfk_2` FOREIGN KEY (`bank_id`) REFERENCES `bank_account` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
