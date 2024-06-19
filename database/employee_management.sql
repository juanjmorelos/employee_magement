-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 19-06-2024 a las 05:12:51
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `employee_management`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `arlInsurance`
--

CREATE TABLE `arlInsurance` (
  `id` int(11) NOT NULL,
  `arlName` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `arlInsurance`
--

INSERT INTO `arlInsurance` (`id`, `arlName`) VALUES
(1, 'Sura'),
(2, 'Simon bolivar'),
(3, 'Positiva');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cesantias`
--

CREATE TABLE `cesantias` (
  `id` int(11) NOT NULL,
  `cesatiasName` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `cesantias`
--

INSERT INTO `cesantias` (`id`, `cesatiasName`) VALUES
(1, 'Protección'),
(2, 'Colpensiones');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `companySettings`
--

CREATE TABLE `companySettings` (
  `id` int(11) NOT NULL,
  `name` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `logo` longtext CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `identifier` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `companySettings`
--

INSERT INTO `companySettings` (`id`, `name`, `logo`, `identifier`) VALUES
(1, 'Universidad Minuto de Dios', '/Users/juanmorelos/Documents/Proyectos_especializacion/Codigo/employee_magement/uploads/20240612213553992377_123456789.png', 123456789);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `concept`
--

CREATE TABLE `concept` (
  `id` int(11) NOT NULL,
  `name` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `operation` enum('ADD','SUBSTRACT') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `healthyInsurance`
--

CREATE TABLE `healthyInsurance` (
  `id` int(11) NOT NULL,
  `insuranceName` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `healthyInsurance`
--

INSERT INTO `healthyInsurance` (`id`, `insuranceName`) VALUES
(1, 'Mutualser'),
(2, 'Sura'),
(3, 'Colsanitas'),
(4, 'Nueva eps');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `nomina`
--

CREATE TABLE `nomina` (
  `id` int(11) NOT NULL,
  `user` int(11) NOT NULL,
  `date` datetime NOT NULL,
  `salaryToPay` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `nominaDetail`
--

CREATE TABLE `nominaDetail` (
  `id` int(11) NOT NULL,
  `concept` int(11) NOT NULL,
  `value` int(11) NOT NULL,
  `workedDays` int(11) NOT NULL,
  `nominaMain` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pension`
--

CREATE TABLE `pension` (
  `id` int(11) NOT NULL,
  `pensionName` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `pension`
--

INSERT INTO `pension` (`id`, `pensionName`) VALUES
(1, 'Protección'),
(2, 'Colpensiones');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `position`
--

CREATE TABLE `position` (
  `id` int(11) NOT NULL,
  `positionName` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `privileges`
--

CREATE TABLE `privileges` (
  `id` int(11) NOT NULL,
  `privilegesName` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `privileges`
--

INSERT INTO `privileges` (`id`, `privilegesName`) VALUES
(1, 'Super administrador'),
(2, 'Administrador'),
(3, 'Empleado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `lastName` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `identifier` bigint(20) NOT NULL,
  `username` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `admissionDate` datetime NOT NULL,
  `retirementDate` datetime DEFAULT NULL,
  `salary` int(11) NOT NULL COMMENT 'Salario bruto',
  `birthdate` date NOT NULL,
  `cesantias` int(11) DEFAULT NULL,
  `pension` int(11) DEFAULT NULL,
  `arlInsurance` int(11) DEFAULT NULL,
  `healthyInsurance` int(11) DEFAULT NULL,
  `password` longtext CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `isActive` tinyint(1) NOT NULL,
  `position` int(11) DEFAULT NULL,
  `privileges` int(11) NOT NULL,
  `company` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `name`, `lastName`, `identifier`, `username`, `email`, `admissionDate`, `retirementDate`, `salary`, `birthdate`, `cesantias`, `pension`, `arlInsurance`, `healthyInsurance`, `password`, `isActive`, `position`, `privileges`, `company`) VALUES
(1, 'Administrador', 'Administrador', 0, 'admin', 'admin@yopmail.com', '2024-06-13 03:20:19', NULL, 0, '2024-06-12', NULL, NULL, NULL, NULL, '1234', 1, NULL, 1, NULL);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `arlInsurance`
--
ALTER TABLE `arlInsurance`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `cesantias`
--
ALTER TABLE `cesantias`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `companySettings`
--
ALTER TABLE `companySettings`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `concept`
--
ALTER TABLE `concept`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `healthyInsurance`
--
ALTER TABLE `healthyInsurance`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `nomina`
--
ALTER TABLE `nomina`
  ADD PRIMARY KEY (`id`),
  ADD KEY `usuario` (`user`);

--
-- Indices de la tabla `nominaDetail`
--
ALTER TABLE `nominaDetail`
  ADD PRIMARY KEY (`id`),
  ADD KEY `concepto` (`concept`),
  ADD KEY `nomina` (`nominaMain`);

--
-- Indices de la tabla `pension`
--
ALTER TABLE `pension`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `position`
--
ALTER TABLE `position`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `privileges`
--
ALTER TABLE `privileges`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cesantias` (`cesantias`),
  ADD KEY `arl` (`arlInsurance`),
  ADD KEY `aseguradora` (`healthyInsurance`),
  ADD KEY `pension` (`pension`),
  ADD KEY `cargo` (`position`),
  ADD KEY `privilegios` (`privileges`),
  ADD KEY `compañia` (`company`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `arlInsurance`
--
ALTER TABLE `arlInsurance`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `cesantias`
--
ALTER TABLE `cesantias`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `companySettings`
--
ALTER TABLE `companySettings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `concept`
--
ALTER TABLE `concept`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `healthyInsurance`
--
ALTER TABLE `healthyInsurance`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `nomina`
--
ALTER TABLE `nomina`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `nominaDetail`
--
ALTER TABLE `nominaDetail`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `pension`
--
ALTER TABLE `pension`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `position`
--
ALTER TABLE `position`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `privileges`
--
ALTER TABLE `privileges`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `nomina`
--
ALTER TABLE `nomina`
  ADD CONSTRAINT `usuario` FOREIGN KEY (`user`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `nominaDetail`
--
ALTER TABLE `nominaDetail`
  ADD CONSTRAINT `concepto` FOREIGN KEY (`concept`) REFERENCES `concept` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `nomina` FOREIGN KEY (`nominaMain`) REFERENCES `nomina` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `arl` FOREIGN KEY (`arlInsurance`) REFERENCES `arlInsurance` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `aseguradora` FOREIGN KEY (`healthyInsurance`) REFERENCES `healthyInsurance` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `cargo` FOREIGN KEY (`position`) REFERENCES `position` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `cesantias` FOREIGN KEY (`cesantias`) REFERENCES `cesantias` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `compañia` FOREIGN KEY (`company`) REFERENCES `companySettings` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `pension` FOREIGN KEY (`pension`) REFERENCES `pension` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `privilegios` FOREIGN KEY (`privileges`) REFERENCES `privileges` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
