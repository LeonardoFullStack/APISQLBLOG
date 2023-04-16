
--CREAR TABLA AUTHORS 
CREATE TABLE authors (
  id_author serial NOT NULL PRIMARY KEY, 
  password varchar(255) NOT NULL,
  name varchar(45) NOT NULL, 
  surname varchar(45) NOT NULL, 
  email varchar(100) NOT NULL UNIQUE,
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
INSERT INTO authors(name,surname,password,email,image,isadmin) --ana es admin
VALUES
('ana','anacleta','$2a$10$/XQkC2mGQQiLq3UKmq71FOWssT4l0WlpYx8/CcCqSrahKOn13IAnS','ana@correo.es','https://randomuser.me/api/portraits/thumb/women/75.jpg', true),
('maria','marieta','$2a$10$/XQkC2mGQQiLq3UKmq71FOWssT4l0WlpYx8/CcCqSrahKOn13IAnS','maria@correo.es','https://randomuser.me/api/portraits/thumb/women/60.jpg', false),
('juan','juanito','$2a$10$/XQkC2mGQQiLq3UKmq71FOWssT4l0WlpYx8/CcCqSrahKOn13IAnS','juan@correo.es','https://randomuser.me/api/portraits/thumb/men/45.jpg', false),
('pepe','pepin','$2a$10$/XQkC2mGQQiLq3UKmq71FOWssT4l0WlpYx8/CcCqSrahKOn13IAnS','pepe@correo.es','https://randomuser.me/api/portraits/thumb/men/72.jpg', false);

--DATOS PRUEBA ENTRIES '',
INSERT INTO entries(title,extract,entryImage,content,id_author,category)
VALUES 
('Noticia: SOL en Madrid','conten...','http://aicmweb.com/wp-content/uploads/2018/03/blog-49006_960_720.png' ,'Contenido noticia 1',(SELECT id_author FROM authors WHERE email='ana@correo.es'),'Tiempo'),
('Noticia: Un panda suelto por la ciudad','Se comió...','http://aicmweb.com/wp-content/uploads/2018/03/blog-49006_960_720.png' ,'El panda se comió todas las frutas de una tienda',(SELECT id_author FROM authors WHERE email='maria@correo.es'),'Sucesos'),
('El rayo gana la champions','Victoria...','http://aicmweb.com/wp-content/uploads/2018/03/blog-49006_960_720.png' ,'Victoria por goleada en la final de la champions',(SELECT id_author FROM authors WHERE email='pepe@correo.es'),'Deportes'),
('Amanece Madrid lleno de arena','La calima...','http://aicmweb.com/wp-content/uploads/2018/03/blog-49006_960_720.png' ,'La calima satura Madrid de arena. Pérdidas millonarias',(SELECT id_author FROM authors WHERE email='maria@correo.es'),'Sucesos'),
('Descubren el motor de agua','Fin de la...','http://aicmweb.com/wp-content/uploads/2018/03/blog-49006_960_720.png' ,'Fin de la gasolina. A partir de ahora usaremos agua en nuestros coches',(SELECT id_author FROM authors WHERE email='juan@correo.es'),'Ciencia'),
('Zersat llega con su nave','Zersat por fin...', 'https://www.cordobahoy.es/asset/thumbnail,992,558,center,center/media/cordobahoy/images/2021/06/26/2021062611105040754.jpg','Zersat llega y pone fin a las guerras.A las guerras y a todo.',(SELECT id_author FROM authors WHERE email='juan@correo.es'),'Religión')
