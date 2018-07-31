
const Configuration = require("./config");


const express = require('express');
const bodyParser = require('body-parser');

const Sequelize = require('sequelize');


// Configure the middleware
const app = express();

app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set("self_url", Configuration.server.url);



// Import controllers
const shortLinksController = require("./controllers/shortLinkController");

// restful api routes
app.post('/', (req, res) => shortLinksController.create(req, res));
app.get('/:shortURL', (req, res) => shortLinksController.get(req, res));


// Run the application
var server = app.listen(3000);

module.exports = server;
