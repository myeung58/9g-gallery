var express = require('express');
var redis = require('redis');

var client = redis.createClient(); // defaults to local 127.0.0.1:6379

client.on('connect', function() {
  console.log('connected to Redis');
});

client.on('error', function (err) {
    console.log('Error ' + err);
});

console.log(__dirname);
// var ApiRequest = require('../middlewares/ApiRequest.js');
var InstaData = require('../middlewares/InstaData.js');

module.exports = (function() {
  'use strict';

  var api = express.Router();

  // api.use(function(req, res, next){
  //   // storing this to redis
  //   client.set('key', 'val', redis.print);
  //   next();
  // });

  api.get('/posts', function(req, res) {
    console.log('query: ', req.query);

    if (!req.query.sortBy && !req.query.page && !req.query.limit) {
      InstaData.init(client, function(mediaData) {
        console.log('about to send to client');
        res.json(mediaData);
      });
    } else {
      // get from redis
      InstaData.sort(req.query.sortBy, req.query.offset, req.query.limit)
        .then(function() {
          // success
          // res.json({ 'key': 'value' });
        }, function() {
          // fail
          res.json({});
        });
    }
  });

  // api.get('/posts/sort', function(req, res) {
  //   console.log(req.query);

  // });

  return api;
})();
