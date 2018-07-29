const models = require("../models");
const shortid = require('shortid');

const ShortLinks = models.ShortLinks;

module.exports = {
    create: function(req, resp) {
        const originalLink = req.body.link;
        const hostname = req.app.get("hostname");
        const shortKey = shortid.generate();

        ShortLinks.build({
             original: originalLink, shortKey: shortKey 
        }).save().then(function(){
            resp.json({
                'short': hostname + shortKey
            });
        }).catch(function(error) {
            console.log("wth?", "An error occurred while generating the url");
            resp.json(error);
        });
    }

};