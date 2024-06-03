
-- Insertar usuarios
INSERT INTO usuario (username, nombre, apellido, fecha_nacimiento, correo) VALUES
   ('user1', 'John', 'Doe', '1990-01-15', 'john.doe@example.com'),
   ('user2', 'Jane', 'Smith', '1985-05-20', 'jane.smith@example.com'),
   ('user3', 'Alice', 'Johnson', '1992-08-25', 'alice.johnson@example.com'),
   ('user4', 'Bob', 'Williams', '1988-02-10', 'bob.williams@example.com'),
   ('user5', 'Charlie', 'Brown', '1995-12-30', 'charlie.brown@example.com'),
   ('user6', 'David', 'Jones', '1991-03-18', 'david.jones@example.com'),
   ('user7', 'Eva', 'Garcia', '1993-07-22', 'eva.garcia@example.com'),
   ('user8', 'Frank', 'Miller', '1989-11-05', 'frank.miller@example.com'),
   ('user9', 'Grace', 'Lee', '1994-09-12', 'grace.lee@example.com'),
   ('user10', 'Henry', 'Wilson', '1987-06-17', 'henry.wilson@example.com');

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
INSERT INTO lista (id_usuario, fecha_creacion) VALUES
   (1, '2023-01-01'),
   (2, '2023-02-01'),
   (3, '2023-03-01'),
   (4, '2023-04-01'),
   (5, '2023-05-01'),
   (6, '2023-06-01'),
   (7, '2023-07-01'),
   (8, '2023-08-01'),
   (9, '2023-09-01'),
   (10, '2023-10-01');

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
