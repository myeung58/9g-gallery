var request = require('request');

var ApiRequest = (function() {
  return {
    get: function(url) {
      var promise = new Promise(function(resolve, reject) {
        // request.get(url, function (error, response, body) {
        //   if (!error && response.statusCode == 200) {
        //     resolve(JSON.parse(body));
        //   } else {
        //     reject(error);
        //   }
        // });
        resolve({
          pagination: {next_max_id: '1229518753651006851_259220806'},
          data: {}
        });
      });

      return promise;
    }
  };
})();

module.exports = ApiRequest;
