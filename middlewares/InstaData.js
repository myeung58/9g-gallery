var request = require('request');

var ApiRequest = require('./util/ApiRequest.js'),
  DataCleaner = require('./util/DataCleaner.js');

module.exports = (function() {
  var access_token = process.env.ACCESS_TOKEN,
    baseUrl = 'https://api.instagram.com/v1/users/259220806/media/recent?access_token=' + access_token,
    initMediaCount = 10, // to get 10 posts from instagram initially
    regularMediaCount = 33, // maximum number of posts allowed
    loadedCount = 0, // to keep track of number of posts received
    maxId,
    defaultClientOffset = 0,
    defaultClientLimit = 10,
    getMediaData;

  getMediaData = function(client, mediaCount) {
    console.log('reached');
    console.log(mediaCount);

    var url = baseUrl + '&count' + mediaCount,
      promise,
      media = {},
      client = client;

      // console.log(client);
      promise = new Promise(function(resolve, reject) {
        ApiRequest.get(url).then(function(mediaData) {

          maxId = mediaData.pagination.next_max_id;
          media = DataCleaner.strip(mediaData.data);

          // save to redis
          media.forEach(function(medium) {
            if (loadedCount <= 200) {

              client.multi().hmset('media:' + medium.id, 'mediaData', JSON.stringify(medium))
              .sadd('mediaList', 'media:'+medium.id)
              .set('comments_'+medium.id, medium.commentCount)
              .set('likes_'+medium.id, medium.likeCount)
              .set('createdAt_'+medium.id, medium.createdAt)
              .exec(function (err, replies) {console.log(err);console.log(replies);});

              loadedCount += 1;
            } else {
              console.log('reached 200 exceed')
              reject('dataset limit of 200 is exceeded');
            }
          });

          console.log('about to resolve');
          resolve(media);

        }, function(err) {
          console.log('rejected', err);
          reject('something went wrong');
        });

      });

    return promise;
  };

  return {
    init: function(client, callback) {
      // var promise,
      //   initUrl = baseUrl + '&count=' + initMediaCount,
      //   media = {};

      // store in redis
      console.log('init media count: ', initMediaCount);
      console.log(getMediaData);

      getMediaData(client, initMediaCount)
        .then(function(mediaData) {
          console.log('received callback');
          console.log(mediaData);
          callback(mediaData);
        }, function() {
          callback({});
        });

    },
    prepareData: function(client) {
      var promise;

      promise = new Promise(function(resolve, reject) {
        // until counter is 200, loop


        // client.smembers('mediaList', function(err, reply) {
        //   console.log('mediaList');
        //   console.log(err)
        //   console.log(reply)
        // });

        // client.sort("mediaList", "by", "comments_*", function(err, replies) {
        //   console.log('sort')
        //   console.log(err)
        //   console.log(replies)
        //   // replies are ['media:1', 'media:2', 'media:3=']
        //   replies.forEach(function(reply) {
        //     console.log(reply)
        //     client.hgetall(reply, function(err, obj) {
        //        console.log(JSON.parse(obj.mediaData))
        //     })
        //   })
        // })


      });

      return promise;
    },
    sort: function(sortBy, offset, limit, callback) {
      // sort by param, then return the specific posts
    }

  };
})();
