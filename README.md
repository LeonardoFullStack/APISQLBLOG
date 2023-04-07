# APISQLBLOG
api de sql


###TABLA ENTRIES
- GET : http://localhost:3000/api/entries/   -**todas las entradas**
- GET : http://localhost:3000/api/entries/one/:id   -**Una entrada por id_entry**
- GET : http://localhost:3000/api/entries/:email   -**todas las entradas del usuario**
- POST : http://localhost:3000/api/entries/    -**crear entrada**
{title, content, email, category, entryImage, extract} = req.body
- DELETE : http://localhost:3000/api/entries/:title   -**borrar una entrada**
{email} = req.body  ( no puede haber dos títulos iguales por email )
- DELETE : http://localhost:3000/api/entries/delbyid/:id   -**borrar una entrada por id (para el admin)**
- PUT : http://localhost:3000/api/entries/:title **actualizar una entrada**

##TABLA AUTHORS 
- GET : http://localhost:3000/api/aut/   **todos los usuarios**
- GET : http://localhost:3000/api/aut/?email=ana@correo.es **datos del autor por email**
- POST : http://localhost:3000/api/aut/ **crear autor**
{name, surname, email, image, password} = req.body
- DELETE : http://localhost:3000/api/aut/:email **borrar autor por email (No puede tener ninguna entrada con su id en la otra tabla)**
- PUT : http://localhost:3000/api/aut/:email **editar autor, email actual por params**
{name, surname, email, image, password} = req.body




por hacer:
modificar el queries.sql para hacer la cuenta aadmin
mandar el error en azul en todos los trycatch


maquetar
paginacion
cambiar el updatebyid por updatebyemail
crear el updatebyId




podría poner el avatar del autor en las entradas


