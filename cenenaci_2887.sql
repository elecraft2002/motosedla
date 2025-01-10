-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Počítač: store6.rosti.cz
-- Vytvořeno: Pát 10. led 2025, 09:58
-- Verze serveru: 11.2.2-MariaDB-1:11.2.2+maria~ubu2204
-- Verze PHP: 8.1.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Databáze: `cenenaci_2887`
--

-- --------------------------------------------------------

--
-- Struktura tabulky `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `parent_id` int(11) DEFAULT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Vypisuji data pro tabulku `categories`
--

INSERT INTO `categories` (`id`, `parent_id`, `name`) VALUES
(1, NULL, 'Electronics'),
(2, 1, 'Laptops'),
(3, 1, 'Smartphones'),
(4, NULL, 'Furniture'),
(5, 4, 'Chairs'),
(6, 4, 'Tables'),
(7, NULL, 'Simson'),
(8, NULL, 'home'),
(9, NULL, 'Simson1'),
(10, NULL, 'Simson1'),
(11, NULL, 'Simson1');

-- --------------------------------------------------------

--
-- Struktura tabulky `category_products`
--

CREATE TABLE `category_products` (
  `category_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Vypisuji data pro tabulku `category_products`
--

INSERT INTO `category_products` (`category_id`, `product_id`) VALUES
(2, 1),
(4, 1),
(2, 2),
(3, 3);

-- --------------------------------------------------------

--
-- Struktura tabulky `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `uid` varchar(256) NOT NULL,
  `category_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `last_modified` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Vypisuji data pro tabulku `products`
--

INSERT INTO `products` (`id`, `uid`, `category_id`, `name`, `price`, `last_modified`) VALUES
(1, 'macbook_pro', 2, 'MacBook Pro', 2399.99, '2024-09-28 17:38:46'),
(2, 'Dell_XPS_13', 2, 'Dell XPS 13', 1899.99, '2024-09-28 17:38:57'),
(3, 'iPhone_13', 3, 'iPhone 13', 999.99, '2024-09-28 17:39:05'),
(4, 'Samsung_Galaxy_S21', 3, 'Samsung Galaxy S21', 799.99, '2024-09-28 17:39:13'),
(5, 'Office_Chair', 5, 'Office Chair', 149.99, '2024-09-28 17:39:18'),
(6, 'Dining_Table', 6, 'Dining Table', 399.99, '2024-09-28 17:39:26');

-- --------------------------------------------------------

--
-- Struktura tabulky `product_images`
--

CREATE TABLE `product_images` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `image_url` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Vypisuji data pro tabulku `product_images`
--

INSERT INTO `product_images` (`id`, `product_id`, `image_url`) VALUES
(1, 1, 'https://d62-a.sdn.cz/d_62/c_img_E_E/fbdCgb/Motocykl-Simson.jpeg?fl=cro,0,212,1403,789%7Cres,1200,,1%7Cjpg,80,,1'),
(2, 1, '/images/IMG_20220903_194512.jpg'),
(3, 2, 'https://example.com/images/dell-xps-13-1.jpg'),
(4, 3, 'https://example.com/images/iphone-13-1.jpg'),
(5, 4, 'https://example.com/images/samsung-galaxy-s21-1.jpg'),
(6, 5, 'https://example.com/images/office-chair-1.jpg'),
(7, 6, 'https://example.com/images/dining-table-1.jpg');

--
-- Indexy pro exportované tabulky
--

--
-- Indexy pro tabulku `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `parent_id` (`parent_id`);

--
-- Indexy pro tabulku `category_products`
--
ALTER TABLE `category_products`
  ADD PRIMARY KEY (`category_id`,`product_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexy pro tabulku `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category_id` (`category_id`),
  ADD KEY `secondary` (`uid`);

--
-- Indexy pro tabulku `product_images`
--
ALTER TABLE `product_images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`);

--
-- AUTO_INCREMENT pro tabulky
--

--
-- AUTO_INCREMENT pro tabulku `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT pro tabulku `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pro tabulku `product_images`
--
ALTER TABLE `product_images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Omezení pro exportované tabulky
--

--
-- Omezení pro tabulku `categories`
--
ALTER TABLE `categories`
  ADD CONSTRAINT `categories_ibfk_1` FOREIGN KEY (`parent_id`) REFERENCES `categories` (`id`);

--
-- Omezení pro tabulku `category_products`
--
ALTER TABLE `category_products`
  ADD CONSTRAINT `category_products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `category_products_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Omezení pro tabulku `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`);

--
-- Omezení pro tabulku `product_images`
--
ALTER TABLE `product_images`
  ADD CONSTRAINT `product_images_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
