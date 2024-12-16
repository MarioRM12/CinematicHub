
-- Insertar usuarios
INSERT INTO usuario (username, nombre, apellido, fecha_nacimiento, correo, password, rol) VALUES
('user1', 'John', 'Doe', '1990-01-15', 'john.doe@example.com', '', 'USER'),
('user2', 'Jane', 'Smith', '1985-05-20', 'jane.smith@example.com', '', 'USER'),
('user3', 'Alice', 'Johnson', '1992-08-25', 'alice.johnson@example.com', '', 'USER'),
('user4', 'Bob', 'Williams', '1988-02-10', 'bob.williams@example.com', '', 'USER'),
('user5', 'Charlie', 'Brown', '1995-12-30', 'charlie.brown@example.com', '', 'USER'),
('user6', 'David', 'Jones', '1991-03-18', 'david.jones@example.com', '', 'USER'),
('user7', 'Eva', 'Garcia', '1993-07-22', 'eva.garcia@example.com', '', 'USER'),
('user8', 'Frank', 'Miller', '1989-11-05', 'frank.miller@example.com', '', 'USER'),
('user9', 'Grace', 'Lee', '1994-09-12', 'grace.lee@example.com', '', 'USER'),
('user10', 'Henry', 'Wilson', '1987-06-17', 'henry.wilson@example.com', '', 'USER');

-- Insertar películas
INSERT INTO pelicula (titulo, descripcion) VALUES
    ('Pelicula 1', 'Descripcion de la pelicula 1'),
    ('Pelicula 2', 'Descripcion de la pelicula 2'),
    ('Pelicula 3', 'Descripcion de la pelicula 3'),
    ('Pelicula 4', 'Descripcion de la pelicula 4'),
    ('Pelicula 5', 'Descripcion de la pelicula 5'),
    ('Pelicula 6', 'Descripcion de la pelicula 6'),
    ('Pelicula 7', 'Descripcion de la pelicula 7'),
    ('Pelicula 8', 'Descripcion de la pelicula 8'),
    ('Pelicula 9', 'Descripcion de la pelicula 9'),
    ('Pelicula 10', 'Descripcion de la pelicula 10');

-- Insertar series
INSERT INTO serie (titulo, descripcion) VALUES
    ('Serie 1', 'Descripcion de la serie 1'),
    ('Serie 2', 'Descripcion de la serie 2'),
    ('Serie 3', 'Descripcion de la serie 3'),
    ('Serie 4', 'Descripcion de la serie 4'),
    ('Serie 5', 'Descripcion de la serie 5'),
    ('Serie 6', 'Descripcion de la serie 6'),
    ('Serie 7', 'Descripcion de la serie 7'),
    ('Serie 8', 'Descripcion de la serie 8'),
    ('Serie 9', 'Descripcion de la serie 9'),
    ('Serie 10', 'Descripcion de la serie 10');

-- Insertar listas
INSERT INTO lista (id_usuario, fecha_creacion, nombre) VALUES
   (1, '2023-01-01', 'Lista de John'),
   (2, '2023-02-01', 'Pendientes'),
   (3, '2023-03-01','Pendientes'),
   (4, '2023-04-01','Pendientes'),
   (5, '2023-05-01','Pendientes'),
   (6, '2023-06-01','Pendientes'),
   (7, '2023-07-01','Pendientes'),
   (8, '2023-08-01','Pendientes'),
   (9, '2023-09-01','Pendientes'),
   (10, '2023-10-01','Pendientes');

-- Insertar relaciones lista-peliculas
INSERT INTO lista_peliculas (id_lista, id_pelicula) VALUES
    (1, 1),
    (1, 2),
    (2, 3),
    (2, 4),
    (3, 5),
    (3, 6),
    (4, 7),
    (4, 8),
    (5, 9),
    (5, 10),
    (6, 1),
    (6, 2),
    (7, 3),
    (7, 4),
    (8, 5),
    (8, 6),
    (9, 7),
    (9, 8),
    (10, 9),
    (10, 10);

-- Insertar relaciones lista-series
INSERT INTO lista_series (id_lista, id_serie) VALUES
      (1, 1),
      (1, 2),
      (2, 3),
      (2, 4),
      (3, 5),
      (3, 6),
      (4, 7),
      (4, 8),
      (5, 9),
      (5, 10),
      (6, 1),
      (6, 2),
      (7, 3),
      (7, 4),
      (8, 5),
      (8, 6),
      (9, 7),
      (9, 8),
      (10, 9),
      (10, 10);

INSERT INTO usuario (username, nombre, apellido, fecha_nacimiento, correo, password, rol)
VALUES ('admin', 'Admin', 'admin', '1980-01-01', 'admin@example.com', '$2a$10$B/Dbg6QfaWgJDEqPgeC22.TCvgU.eT1gRJftvXzFjHpPuIki9HveO', 'ADMIN');

# USANDO API - EJEMPLOS REALES PARA TOQUETEAR

-- Modificar la columna 'descripcion' en la tabla 'pelicula'
ALTER TABLE pelicula MODIFY descripcion TEXT;

-- Modificar la columna 'descripcion' en la tabla 'serie'
ALTER TABLE serie MODIFY descripcion TEXT;
-- Insertar películas
INSERT INTO pelicula (titulo, descripcion, imagen) VALUES
                                                       ('Venom: El último baile', 'Eddie y Venom están a la fuga. Perseguidos por sus sendos mundos y cada vez más cercados,', 'https://image.tmdb.org/t/p/w500/b0obWWCLRVRqRzlSK1LSGtADkLM.jpg'),
                                                       ('Vaiana 2', 'Tras recibir una inesperada llamada de sus antepasados, Vaiana debe viajar a los lejanos mares de Oceanía ', 'https://image.tmdb.org/t/p/w500/hSjM4OPwfF3PvWsVgV6SKd6GeXJ.jpg'),
                                                       ('Red One', 'Tras el secuestro de Papá Noel (nombre en clave: RED ONE), el Jefe de Seguridad del Polo Norte (Dwayne Johnson)', 'https://image.tmdb.org/t/p/w500/dpskAcm71w5v8zQ8RmPmJiP31Om.jpg'),
                                                       ('Elevation', 'Sin descripción.', 'https://image.tmdb.org/t/p/w500/uQhYBxOVFU6s9agD49FnGHwJqG5.jpg'),
                                                       ('Absolution', 'Un curtido y peligroso gangster (Liam Neeson) descubre que está empezando a perder la memoria. ', 'https://image.tmdb.org/t/p/w500/6QsBGrKAs6pgypqkqVVyHICJnpY.jpg');

-- Insertar series
INSERT INTO serie (titulo, descripcion, imagen) VALUES
                                                    ('Brocade Odyssey', 'Ji Yingying, una mujer luchadora de Shu brocado, se esfuerza por restaurar el honor de su familia y reconstruir su legado. Ante rivales poderosos y la amenaza del Reino de Nanzhao, se une a Yang Jinglan para revivir la industria del brocado Shu y proteger a sus artesanos.', 'https://image.tmdb.org/t/p/w500/6TobR12xuAxyuN8BL0Yf08ZfFly.jpg'),
                                                    ('Binnelanders', 'Una telenovela sudafricana en afrikáans ambientada en y alrededor del hospital ficticio Binneland Kliniek en Pretoria. La trama sigue los juicios, traumas y tribulaciones del personal y los pacientes del hospital.', 'https://image.tmdb.org/t/p/w500/3bzECfllho8PphdYujLUIuhncJD.jpg'),
                                                    ('Yellowstone', 'Sigue el violento mundo de la familia Dutton, que controla el rancho más grande y contiguo de los Estados Unidos. Liderados por su patriarca John Dutton, la familia defiende su propiedad de constantes ataques de desarrolladores, una reserva india y el primer parque nacional de Norteamérica.', 'https://image.tmdb.org/t/p/w500/s4QRRYc1V2e68Qy9Wel9MI8fhRP.jpg'),
                                                    ('Come Home Love: Lo and Behold', 'Hung Sue Gan, comenzando desde abajo, estableció su propia empresa de logística, que ahora funciona sin problemas. Su única preocupación ahora son sus tres hijas. Su hija mayor ha emigrado al extranjero...', 'https://image.tmdb.org/t/p/w500/lgD4j9gUGmMckZpWWRJjorWqGVT.jpg'),
                                                    ('Gran Hermano', 'Un reality show de televisión transmitido en España, parte de la franquicia Big Brother desarrollada en los Países Bajos. Se centra en los eventos y vida cotidiana de los participantes dentro de la casa.', 'https://image.tmdb.org/t/p/w500/gQ0Emh2LT047Fip2HWye3NkrkQB.jpg');


-- Insertar nueva lista para el usuario admin
INSERT INTO lista (id_usuario, fecha_creacion, nombre) VALUES
    (11, CURRENT_DATE, 'Prueba');

-- Obtener el ID de la nueva lista (asumiendo que es incremental, el nuevo ID sería el siguiente disponible)

-- Insertar películas en la lista "Prueba"
INSERT INTO lista_peliculas (id_lista, id_pelicula) VALUES
                                                        ((SELECT MAX(id_lista) FROM lista WHERE nombre = 'Prueba'), 11), -- Venom: El último baile
                                                        ((SELECT MAX(id_lista) FROM lista WHERE nombre = 'Prueba'), 12), -- Vaiana 2
                                                        ((SELECT MAX(id_lista) FROM lista WHERE nombre = 'Prueba'), 13), -- Red One
                                                        ((SELECT MAX(id_lista) FROM lista WHERE nombre = 'Prueba'), 14), -- Elevation
                                                        ((SELECT MAX(id_lista) FROM lista WHERE nombre = 'Prueba'), 15); -- Absolution

-- Insertar series en la lista "Prueba"
INSERT INTO lista_series (id_lista, id_serie) VALUES
                                                  ((SELECT MAX(id_lista) FROM lista WHERE nombre = 'Prueba'), 11), -- Brocade Odyssey
                                                  ((SELECT MAX(id_lista) FROM lista WHERE nombre = 'Prueba'), 12), -- Binnelanders
                                                  ((SELECT MAX(id_lista) FROM lista WHERE nombre = 'Prueba'), 13), -- Yellowstone
                                                  ((SELECT MAX(id_lista) FROM lista WHERE nombre = 'Prueba'), 14), -- Come Home Love: Lo and Behold
                                                  ((SELECT MAX(id_lista) FROM lista WHERE nombre = 'Prueba'), 15); -- Gran Hermano