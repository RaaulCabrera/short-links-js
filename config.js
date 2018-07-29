// This file should be in .gitignore 
// but for this moment just ignore this issue :)

var config = {};

config.database = {
    "dialect": "sqlite",
    "storage": "./storage/shortlinks.db"
};

config.server = {
    'domain': 'http://127.0.0.1/'
};


module.exports = config;