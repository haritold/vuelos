CREATE DATABASE Desarrollo;

USE Desarrollo;
GO

-- Crear la tabla Usuarios
CREATE TABLE Usuarios (
    id_usuario INT PRIMARY KEY IDENTITY(1,1),
    nombre NVARCHAR(100) NOT NULL,
    telefono NVARCHAR(20) NOT NULL,
    correo NVARCHAR(100) NOT NULL UNIQUE,
    password NVARCHAR(100) NOT NULL
);
GO

-- Crear la tabla Aerolinea
CREATE TABLE Aerolineas (
    id_aerolinea INT PRIMARY KEY IDENTITY(1,1),
    nombre NVARCHAR(100) NOT NULL,
    pais NVARCHAR(100) NOT NULL,
    sitio_web VARCHAR(100) NOT NULL,
    telefono VARCHAR(20) NOT NULL
);
GO

-- Crear la tabla Vuelos
CREATE TABLE Vuelos (
    id_vuelo INT PRIMARY KEY IDENTITY(1,1),
    id_aerolinea INT NOT NULL,
    origen NVARCHAR(100) NOT NULL,
    destino NVARCHAR(100) NOT NULL,
    fecha_salida DATETIME NOT NULL,
    fecha_llegada DATETIME NOT NULL,
    precio DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (id_aerolinea) REFERENCES Aerolineas(id_aerolinea)
);
GO

-- Crear la tabla Reservas
CREATE TABLE Reservas (
    id_reserva INT PRIMARY KEY IDENTITY(1,1),
    id_vuelo INT NOT NULL,
    id_usuario INT NOT NULL,
    fecha DATETIME NOT NULL,
    asiento INT NOT NULL,
    FOREIGN KEY (id_vuelo) REFERENCES Vuelos(id_vuelo),
    FOREIGN KEY (id_usuario) REFERENCES Usuarios(id_usuario)
);
GO

INSERT INTO Usuarios (nombre, telefono, correo, password)
VALUES ('Juan Perez', '123456789', 'juan@mail.com', 'password123');
GO

INSERT INTO Aerolineas (nombre, pais, sitio_web, telefono)
VALUES ('AVIANCA', 'COLOMBIA', 'avianca.com', '3003003001');
GO

-- Insertar vuelo de prueba
insert INTO Vuelos (origen, destino, fecha_salida, fecha_llegada, precio, id_aerolinea)
VALUES ('BOGOTA', 'CALI', '2024-08-01 08:00:00', '2024-08-01 10:00:00', 250000.00, 1);
GO
