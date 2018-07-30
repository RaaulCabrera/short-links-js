const fs = require("fs");
const path = require('path');
const Sequelize = require("sequelize");

// System comfiguration
const Configuration = require("../config");

var sequelize = new Sequelize({
    dialect: Configuration.database.dialect,
    storage: Configuration.database.storage,
    logging: Configuration.database.logging
});

var db = {};

fs.readdirSync(__dirname).filter(function (file) {
  return file.match(/\.js$/) !== null && file !== 'index.js';
}).forEach(function (file) {
  console.log("importing", file);
  const model = sequelize.import(path.join(__dirname, file));
  db[model.name] = model;
});
Object.keys(db).forEach(function (modelName) {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

sequelize.sync();

db.sequelize = sequelize;

module.exports = db;