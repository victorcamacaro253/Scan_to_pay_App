-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 08-10-2024 a las 03:17:18
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `paymentsistem`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalles_pago`
--

CREATE TABLE `detalles_pago` (
  `id` int(50) NOT NULL,
  `pago_id` int(50) NOT NULL,
  `producto_id` int(50) NOT NULL,
  `cantidad` int(50) NOT NULL,
  `precio` decimal(50,4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pagos`
--

CREATE TABLE `pagos` (
  `id` int(50) NOT NULL,
  `id_usuario` int(50) NOT NULL,
  `stripe_payment_id` int(250) NOT NULL,
  `monto` decimal(50,4) NOT NULL,
  `qr_code` varchar(250) NOT NULL,
  `estado` enum('pendiente','completado','fallido') NOT NULL,
  `fecha` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id` int(50) NOT NULL,
  `nombre_producto` varchar(250) NOT NULL,
  `descripcion` varchar(250) NOT NULL,
  `precio` varchar(250) NOT NULL,
  `created_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id`, `nombre_producto`, `descripcion`, `precio`, `created_at`) VALUES
(1, 'computadora', 'es una computadora', '145', '2024-10-07'),
(2, 'carro', 'es un carro', '250,24', '2024-10-02');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(250) NOT NULL,
  `correo` varchar(250) DEFAULT NULL,
  `google_id` int(50) DEFAULT NULL,
  `facebook_id` int(50) DEFAULT NULL,
  `github_id` int(50) DEFAULT NULL,
  `twitter_id` int(50) DEFAULT NULL,
  `imagen` varchar(250) DEFAULT NULL,
  `created_at` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `correo`, `google_id`, `facebook_id`, `github_id`, `twitter_id`, `imagen`, `created_at`) VALUES
(1, 'victor', 'victor@gmail.com', NULL, NULL, NULL, NULL, NULL, '2024-10-07'),
(2, 'mirlangel cortez', 'mirlangel@gmail.com', NULL, NULL, NULL, NULL, NULL, '2024-10-07');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
