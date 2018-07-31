/**
//TODO
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

app.set("self_url", Configuration.server.url);

app.use(express.static('public'));

// Import controllers
const shortLinksController = require("./controllers/shortLinkController");

// restful api routes
app.post('/', (req, res) => shortLinksController.create(req, res));
app.get('/:shortURL', (req, res) => shortLinksController.get(req, res));


// Run the application
var server = app.listen(3000);

module.exports = server;