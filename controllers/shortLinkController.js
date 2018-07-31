const models = require("../models");
const shortid = require('shortid');

const ShortLinks = models.ShortLinks;

module.exports = {

    create: function(req, resp) {

        var urls = [];

        if(Array.isArray(req.body)) {
            urls = req.body;
        } else if(req.body.url && typeof req.body.url == "string") {
            urls.push(req.body.url);
        }

        if(urls.length > 100) {
            resp.send(500);
            resp.json("You could not send too many urls");
            return;
        }

        var shortLinks = [];
        var tasks = [];
        const hostname = req.app.get("self_url");

        urls.forEach(function(url) {
            const key = shortid.generate();
            const shortLink = {
                original: url,
                short: hostname + key
            };
            shortLinks.push(shortLink);
            tasks.push(
                ShortLinks.build({ original: url, shortKey: key }).save()
            )
        });

        Promise.all(tasks).then(function(){
            resp.json(shortLinks);
        }).catch(function(error){
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
            if(!url) {
                resp.status(404);
                resp.json("Content Not Fond!");
                return;
            }
            resp.redirect(url.original);
        });
    }

};