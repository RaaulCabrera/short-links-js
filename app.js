/**
//TODO
Descripción
La siguiente prueba consiste en construir los servicios web necesarios usando como referencia API REST FULL, los servicios web deben ser capaz de acortar URLS en general, podrías usar Node.js, Python o PHP para el desarrollo de esta prueba.
Instrucciones
Utiliza Git para Documentar tu código realizando commits conforme realizes las tareas.

Al finalizar la prueba deberá contener un archivo README que explique exactamente los pasos necesarios para construir y ejecutar el proyecto.

También se debe proporcionar la documentación de los servicios web, puedes usar Postman. 
Crear un servicio web capaz de acortar url's, por ejemplo, si se recibe la URL "https://facebook.com" se debería devolver "http://host/Ux26Yp".
Crear un servicio web para que cuando alguien acceda a la URL "https://host/Ux26Yp", el servidor redireccione a la URL real que es "https://facebook.com".
Crear un servicio web capaz de recibir una lista de urls, esta deberá retornar la lista de url's acortadas.
Extras
Crear una interfaz web que permita a los usuarios enviar una url para acortarla.
Agregar a la interfaz una opción para enviar un archivo de texto lleno de URL's, esto deberá ser enviado a la API masiva. Los resultados pueden presentarse directamente en la página y descargarse como un archivo de texto.
Agregar una vista para listar todas las URL's y su versión corta.
 */
const Configuration = require("./config");


const express = require('express');
const bodyParser = require('body-parser');

const Sequelize = require('sequelize');


// Configure the middleware
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set("hostname", Configuration.server.domain);

// Import controllers
const shortLinksController = require("./controllers/shortLinkController");

// restful api routes
app.post('/api/short-links/', (req, res) => shortLinksController.create(req, res));


// Run the application
app.listen(3000, () => console.log('Example app listening on port 3000!'));
