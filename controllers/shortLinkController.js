const models = require("../models");
const shortid = require('shortid');

const ShortLinks = models.ShortLinks;

module.exports = {

    create: function(req, resp) {
        const originalLink = req.body.url;
        const hostname = req.app.get("self_url");
        const shortKey = shortid.generate();

        ShortLinks.build({
             original: originalLink, shortKey: shortKey 
        }).save().then(function(){
            resp.json({
                'short': hostname + shortKey,
                'original':originalLink
            });
        }).catch(function(error) {
            resp.status(500);
            resp.json({
                'error': 'Unable to create a short-link'
            }); 
            console.error(error);
        });
    },

    get: function(req, resp) {
        const shortURL = req.params.shortURL;
        ShortLinks.findOne({ where: { shortKey: shortURL } }).then(function(url) {
            resp.redirect(url.original);
        });
    }

};