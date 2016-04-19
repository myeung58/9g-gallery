var express = require('express');
var redis = require('redis');

var client = redis.createClient(); // defaults to local 127.0.0.1:6379

client.on('connect', function() {
  console.log('connected to Redis');
});

client.on('error', function (err) {
    console.log('Error ' + err);
});

var InstaData = require('../middlewares/InstaData.js');

module.exports = (function() {
  'use strict';

  var api = express.Router();

  api.get('/posts', function(req, res) {
    var options = {
      sortBy: req.query['sortBy'],
      offset: req.query['offset'],
      limit: req.query['limit']
    };

    if (!options.sortBy && !options.offset && !options.limit) {
      InstaData.init(client, function(mediaData) {
        res.json(mediaData);

        // prepare the dataset of 200 posts
        InstaData.prepareDataset(client);
      });
    } else {
      InstaData.get(client, options, function(mediaData) {
        res.json(mediaData);
      });
    }
  });

  return api;
})();
