// This file should be in .gitignore 
// but for this moment just ignore this issue :)

var config = {};

config.database = {
    "dialect": "sqlite",
    "storage": "./storage/shortlinks.db"
};

config.server = {
    'url': 'http://127.0.0.1:3000/',
    'port' : 3000
};


module.exports = config;