const request = require('request');
const Chai = require('chai');
const assert = Chai.assert;

const models = require('../models');
const ShortLinks = models.ShortLinks;

const config = require('../config');

var server = null;
const server_url = config.server.url;

before(function(){
    // Configure the test environment
    server = require('../app');
});

after(function(){
    server.close();
});


describe('Functional test of the api for short-links', function() {

    it('The API should create a short-link when any client provides one by POST method', function(done) {
        request.post({
            url: server_url,
            method: 'post',
            json: true,
            body: {
                url:  "https://www.facebook.com/"
            }
        }, function(err, resp, body){
            if(err) {
                console.err(err);
            }
            
            assert.isNull(err, 'Something is wrong.');
            assert.equal(resp.statusCode, 200, 'Something is wrong: ' + resp.statusCode);
            assert.isNotNull(body, 'The response is null');
            assert.property(body, 'original', 'The response does not has the original link' );
            assert.property(body, 'short','The response does not has the short-link :(');
            assert.notEqual(body.original, body.short, 'Wth? The original and short url are the same!');
            assert.isTrue(body.original.length < body.short.length, 'The "shortLink" is too large');
            
            done();
        });
    });

    it('When the user provide a short url, the api should make a redirect', function(done) {
        // First get an item from the db
        ShortLinks.findAll({
            limit: 1,
            order:[ ['createdAt', 'DESC'] ]
        }).then(function(lastItems){
            var last = lastItems[0];
            request.get({
                json: true,
                followRedirect: false,
                url: server_url + last.shortKey
            }, function(err, resp, body) {
                if(err) {
                    console.error(err);
                }
                assert.isNull(err, 'Something is wrong.');
                
                assert.equal(resp.statusCode, 302, 'The server does not make a redirect');
                assert.equal(resp.headers.location, last.original);
                done();
            });
        });

    });

});

