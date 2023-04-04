
--CREAR TABLA AUTHRS 
CREATE TABLE authors (
  id_author serial NOT NULL PRIMARY KEY, 
  password varchar(255) NOT NULL,
  name varchar(45) NOT NULL, 
  surname varchar(45) NOT NULL, 
  email varchar(100) NOT NULL UNIQUE,
  image varchar(255),
  isAdmin boolean DEFAULT false
);


--CREAR TABLA ENTRIES
CREATE TABLE entries (
  id_entry serial NOT NULL PRIMARY KEY, 
  title varchar(100) NOT NULL, 
  content text NOT NULL, 
  date varchar(10) DEFAULT to_char(date_trunc('day', CURRENT_DATE), 'dd/mm/yyyy'),
  id_author int,
  entryImage varchar(255),
  category varchar(15),
  extract varchar(100),
  FOREIGN KEY (id_author) REFERENCES authors(id_author)
);

--DATOS PRUEBA AUTORES
INSERT INTO authors(name,surname,password,email,image) --falta el estracto (abajo)
VALUES
('ana','anacleta','1234','ana@correo.es','https://randomuser.me/api/portraits/thumb/women/75.jpg'),
('maria','marieta','1234','maria@correo.es','https://randomuser.me/api/portraits/thumb/women/60.jpg'),
('juan','juanito','1234','juan@correo.es','https://randomuser.me/api/portraits/thumb/men/45.jpg'),
('pepe','pepin','1234','pepe@correo.es','https://randomuser.me/api/portraits/thumb/men/72.jpg');

--DATOS PRUEBA ENTRIES '',
INSERT INTO entries(title,extract,entryImage,content,id_author,category)
VALUES 
('Noticia: SOL en Madrid','conten...','http://aicmweb.com/wp-content/uploads/2018/03/blog-49006_960_720.png' ,'Contenido noticia 1',(SELECT id_author FROM authors WHERE email='ana@correo.es'),'Tiempo'),
('Noticia: Un panda suelto por la ciudad','Se comió...','http://aicmweb.com/wp-content/uploads/2018/03/blog-49006_960_720.png' ,'El panda se comió todas las frutas de una tienda',(SELECT id_author FROM authors WHERE email='maria@correo.es'),'Sucesos'),
('El rayo gana la champions','Victoria...','http://aicmweb.com/wp-content/uploads/2018/03/blog-49006_960_720.png' ,'Victoria por goleada en la final de la champions',(SELECT id_author FROM authors WHERE email='pepe@correo.es'),'Deportes'),
('Amanece Madrid lleno de arena','La calima...','http://aicmweb.com/wp-content/uploads/2018/03/blog-49006_960_720.png' ,'La calima satura Madrid de arena. Pérdidas millonarias',(SELECT id_author FROM authors WHERE email='maria@correo.es'),'Sucesos'),
('Descubren el motor de agua','Fin de la...','http://aicmweb.com/wp-content/uploads/2018/03/blog-49006_960_720.png' ,'Fin de la gasolina. A partir de ahora usaremos agua en nuestros coches',(SELECT id_author FROM authors WHERE email='juan@correo.es'),'Ciencia');
