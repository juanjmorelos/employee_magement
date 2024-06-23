-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 23-06-2024 a las 17:54:07
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
(2, 'Seguros bolivar'),
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
(1, 'Corporación universitaria minuto de Dios', '/uploads/20240622001331962819_8983489091.png', 8983489091);

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

--
-- Volcado de datos para la tabla `position`
--

INSERT INTO `position` (`id`, `positionName`) VALUES
(1, 'Desarrollador móvil'),
(2, 'Desarrollador web'),
(3, 'Desarrollador backend (servicios)'),
(4, 'Desarrollador backend (DB admin)'),
(5, 'Analista QA'),
(6, 'Desarrollador full stack');

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
  `admissionDate` timestamp NOT NULL DEFAULT current_timestamp(),
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
  `company` int(11) DEFAULT NULL,
  `account` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `name`, `lastName`, `identifier`, `username`, `email`, `admissionDate`, `retirementDate`, `salary`, `birthdate`, `cesantias`, `pension`, `arlInsurance`, `healthyInsurance`, `password`, `isActive`, `position`, `privileges`, `company`, `account`) VALUES
(7, 'Diego', 'Perez Andrade', 106502948, 'dperez', 'nuevo@yopmail.com', '2018-06-15 01:14:00', '2023-05-17 00:00:00', 5500000, '1900-04-13', 1, 2, 2, 3, '$2b$12$XD/VbMprVdRQ9.DsyZWtRuoNY5KRCjuqdcPVLNv0KRdWyhYz/W1FC', 0, 2, 1, 1, 57789609839),
(8, 'Juan', 'Pérez', 1234567890, 'juanp', 'juanp@example.com', '2023-01-15 13:00:00', NULL, 2500000, '1990-05-20', 2, 2, 1, 1, '$2b$12$C1TdTy2TjvIuP6Px1vOG7OrYsdRMYDyoDKI.saUomJEc6Qd39Z6Bm', 1, 3, 1, 1, 19482576390),
(9, 'María', 'López', 9876543210, 'marial', 'marial@example.com', '2022-11-10 15:30:00', NULL, 3000000, '1985-08-12', 2, 1, 2, 2, '$2b$12$C1TdTy2TjvIuP6Px1vOG7OrYsdRMYDyoDKI.saUomJEc6Qd39Z6Bm', 1, 2, 2, 1, 87462395120),
(10, 'Pedro', 'González', 4567890123, 'pedrog', 'pedrog@example.com', '2024-03-05 17:15:00', NULL, 2000000, '1995-03-25', 1, 1, 3, 3, '$2b$12$C1TdTy2TjvIuP6Px1vOG7OrYsdRMYDyoDKI.saUomJEc6Qd39Z6Bm', 1, 1, 3, 1, 30928745631),
(11, 'Ana', 'Martínez', 7890123456, 'anam', 'anam@example.com', '2021-09-20 14:45:00', '2023-07-01 00:00:00', 2800000, '1988-11-30', 1, 1, 1, 4, '$2b$12$C1TdTy2TjvIuP6Px1vOG7OrYsdRMYDyoDKI.saUomJEc6Qd39Z6Bm', 0, 2, 2, 1, 61094537289),
(12, 'Carlos', 'Ruiz', 2345678901, 'carlosr', 'carlosr@example.com', '2023-02-28 16:00:00', NULL, 2600000, '1992-04-15', 2, 2, 2, 1, '$2b$12$C1TdTy2TjvIuP6Px1vOG7OrYsdRMYDyoDKI.saUomJEc6Qd39Z6Bm', 1, 3, 3, 1, 75839461205),
(13, 'Sofía', 'Sánchez', 8901234567, 'sofias', 'sofias@example.com', '2022-06-10 13:30:00', '2024-05-15 00:00:00', 3200000, '1983-10-05', 2, 1, 3, 2, '$2b$12$C1TdTy2TjvIuP6Px1vOG7OrYsdRMYDyoDKI.saUomJEc6Qd39Z6Bm', 0, 2, 1, 1, 12698054327),
(14, 'Luis', 'Díaz', 5678901234, 'luisd', 'luisd@example.com', '2024-01-02 12:00:00', NULL, 1800000, '1998-07-08', 1, 2, 1, 3, '$2b$12$C1TdTy2TjvIuP6Px1vOG7OrYsdRMYDyoDKI.saUomJEc6Qd39Z6Bm', 1, 1, 3, 1, 49367102845),
(15, 'Elena', 'Gómez', 3456789012, 'elenag', 'elenag@example.com', '2023-10-15 19:20:00', NULL, 2900000, '1980-12-18', 1, 1, 2, 4, '$2b$12$C1TdTy2TjvIuP6Px1vOG7OrYsdRMYDyoDKI.saUomJEc6Qd39Z6Bm', 1, 3, 2, 1, 84019276534),
(16, 'Javier', 'Hernández', 6789012345, 'javierh', 'javierh@yopmail.com', '2022-08-05 18:10:00', NULL, 2700000, '1993-09-22', 2, 2, 3, 1, '$2b$12$6qDBkRADcV0/c.VwgwGaDO9aVaGK5wPWp5pxcLnKvRpT13iLmGSVS', 1, 2, 1, 1, 27638450917),
(17, 'Carmen', 'Torres', 123456789, 'carment', 'carment@example.com', '2021-12-30 21:00:00', NULL, 3100000, '1987-06-14', 2, 2, 1, 2, '$2b$12$C1TdTy2TjvIuP6Px1vOG7OrYsdRMYDyoDKI.saUomJEc6Qd39Z6Bm', 1, 4, 2, 1, 65209381742),
(18, 'Francisco', 'Vargas', 7890123456, 'franciscov', 'franciscov@example.com', '2023-04-18 14:30:00', NULL, 2400000, '1991-02-28', 1, 1, 2, 3, '$2b$12$C1TdTy2TjvIuP6Px1vOG7OrYsdRMYDyoDKI.saUomJEc6Qd39Z6Bm', 1, 4, 3, 1, 30512749863),
(19, 'Raquel', 'Ortega', 4567890123, 'raquelo', 'raquelo@example.com', '2024-05-20 15:45:00', NULL, 2600000, '1994-11-10', 1, 1, 3, 4, '$2b$12$C1TdTy2TjvIuP6Px1vOG7OrYsdRMYDyoDKI.saUomJEc6Qd39Z6Bm', 1, 5, 1, 1, 48953617082),
(20, 'Diego', 'Flores', 8901234567, 'diegof', 'diegof@example.com', '2022-07-08 16:15:00', NULL, 2800000, '1986-09-03', 2, 2, 1, 1, '$2b$12$C1TdTy2TjvIuP6Px1vOG7OrYsdRMYDyoDKI.saUomJEc6Qd39Z6Bm', 1, 1, 2, 1, 21370849536),
(21, 'Verónica', 'Ramírez', 2345678901, 'veronicar', 'veronicar@example.com', '2023-03-15 20:30:00', NULL, 3000000, '1997-04-25', 2, 2, 2, 2, '$2b$12$C1TdTy2TjvIuP6Px1vOG7OrYsdRMYDyoDKI.saUomJEc6Qd39Z6Bm', 1, 3, 1, 1, 53019284765),
(22, 'Arturo', 'Reyes', 6789012345, 'arturor', 'arturor@example.com', '2024-02-10 19:00:00', NULL, 2200000, '1989-01-12', 1, 1, 3, 4, '$2b$12$C1TdTy2TjvIuP6Px1vOG7OrYsdRMYDyoDKI.saUomJEc6Qd39Z6Bm', 1, 2, 3, 1, 98273614509),
(23, 'Laura', 'Navarro', 3456789012, 'lauran', 'lauran@example.com', '2022-10-05 17:00:00', NULL, 3200000, '1984-08-30', 2, 2, 1, 1, '$2b$12$C1TdTy2TjvIuP6Px1vOG7OrYsdRMYDyoDKI.saUomJEc6Qd39Z6Bm', 1, 5, 1, 1, 14782360591),
(24, 'Gabriel', 'Iglesias', 5678901234, 'gabrieli', 'gabrieli@example.com', '2023-08-12 14:00:00', NULL, 1900000, '1996-05-16', 1, 1, 2, 2, '$2b$12$C1TdTy2TjvIuP6Px1vOG7OrYsdRMYDyoDKI.saUomJEc6Qd39Z6Bm', 1, 3, 2, 1, 67438210945),
(25, 'Paula', 'Castro', 1234567890, 'paulac', 'paulac@example.com', '2024-04-05 13:45:00', NULL, 2900000, '1999-02-20', 1, 1, 3, 3, '$2b$12$C1TdTy2TjvIuP6Px1vOG7OrYsdRMYDyoDKI.saUomJEc6Qd39Z6Bm', 1, 6, 3, 1, 29017483659),
(26, 'Roberto', 'Santos', 123456789, 'robertos', 'robertos@example.com', '2023-09-25 19:15:00', NULL, 2600000, '1981-07-04', 2, 1, 1, 4, '$2b$12$C1TdTy2TjvIuP6Px1vOG7OrYsdRMYDyoDKI.saUomJEc6Qd39Z6Bm', 1, 1, 1, 1, 4778904567890),
(27, 'Isabel', 'Gutiérrez', 7890123456, 'isabelg', 'isabelg@example.com', '2022-12-15 15:00:00', NULL, 3100000, '1982-03-10', 1, 2, 2, 1, '$2b$12$C1TdTy2TjvIuP6Px1vOG7OrYsdRMYDyoDKI.saUomJEc6Qd39Z6Bm', 1, 3, 2, 1, 4779887654321),
(29, 'Andrea', 'Mejia', 1300456789, 'apension', 'andre@yopmail.com', '2024-06-22 21:19:06', NULL, 1500000, '1997-10-15', 1, 1, 3, 3, '$2b$12$PVE4OHK409LJeGLSE/AFA.2aFE0j3NuB5FTnDf.uemr.J5wIWZzHq', 1, 5, 3, 1, 5770000345);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `privileges`
--
ALTER TABLE `privileges`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

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
