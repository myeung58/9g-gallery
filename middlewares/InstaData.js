var request = require('request');

var ApiRequest = require('./util/ApiRequest.js');

module.exports = (function() {
  return {
    init: function(client) {
      // get 200 posts
      // store in redis
      // client.set('key', 'val', redis.print);
      var promise = new Promise(function(resolve, reject) {
        // request.get(url, function (error, response, body) {
        //   if (!error && response.statusCode == 200) {
        //     resolve(JSON.parse(body));
        //   } else {
        //     reject(error);
        //   }
        // });
      });
      return promise;
    },
    get: function(sortBy, offset, limit, callback) {
      // sort by param, then return the specific posts
    }
  };
})();
