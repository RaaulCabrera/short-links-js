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

    it('The API should create a short-link when any client provides one url by POST method', function(done) {
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
            assert.isArray(body, 'The api response is strange');
            assert.lengthOf(body, 1, 'The response should be 1 item!');
            const shortUrl = body[0];
            assert.property(shortUrl, 'original', 'The response does not has the original link' );
            assert.property(shortUrl, 'short','The response does not has the short-link :(');
            assert.notEqual(shortUrl.original, shortUrl.short, 'Wth? The original and short url are the same!');
            
            done();
        });
    });

    it('When the client send many urls the api should process all', function(done){
        const urls = [
            'https://www.facebook.com/perritoshc/photos/a.594708837348305.1073741829.590975801054942/1173745906111259/?type=3&theater',
            'https://www.amazon.com.mx/Funko-Figura-Avengers-Infinity-War/dp/B079PPFFSC/ref=lp_11337429011_1_2?s=toys&ie=UTF8&qid=1532915700&sr=1-2',
            'https://twitter.com/StephenKing/status/1018518307077525505',
            'https://stackoverflow.com/questions/84556/whats-your-favorite-programmer-cartoon'
        ];
        request.post({
            'url': server_url,
            json: true,
            method: 'post',
            body: urls
        }, function(err, resp, body){

            if(err) {
                console.err(err);
            }
            
            assert.isNull(err, 'Something is wrong.');
            assert.equal(resp.statusCode, 200, 'Something is wrong: ' + resp.statusCode);
            assert.isNotNull(body, 'The response is null');
            assert.isArray(body, 'The api response is strange');

            assert.lengthOf(body, urls.length, "The api should return the same number of urls");

            body.forEach(function(shortUrl){
                assert.property(shortUrl, 'original', 'The response does not has the original link' );
                assert.property(shortUrl, 'short','The response does not has the short-link :(');
                assert.notEqual(shortUrl.original, shortUrl.short, 'Wth? The original and short url are the same!');
            });

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

