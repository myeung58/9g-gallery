var request = require('request');

var ApiRequest = require('./util/ApiRequest.js'),
  DataCleaner = require('./util/DataCleaner.js');

module.exports = (function() {
  var access_token = process.env.ACCESS_TOKEN,
    baseUrl = 'https://api.instagram.com/v1/users/259220806/media/recent?access_token=' + access_token,
    initMediaCount = 10, // to get 10 posts from instagram initially
    regularMediaCount = 25, // number of posts to retrieve per request
    defaultDataSize = 30,
    loadedCount = 0, // to keep track of number of posts received
    maxIdString = '',
    defaultClientOffset = 0,
    defaultClientLimit = 10,
    getMediaData;

  getMediaData = function(client, mediaCount, options) {

    var url = baseUrl + '&count=' + mediaCount + maxIdString,
      promise,
      media = {},
      client = client,
      options = options;

      promise = new Promise(function(resolve, reject) {
        // (refactor nested promises wiht .all)
        ApiRequest.get(url).then(function(mediaData) {

          maxIdString = '&max_id=' + mediaData.pagination.next_max_id;
          media = DataCleaner.strip(mediaData.data);
          console.log('cleaned data');

          // save to redis
          media.forEach(function(medium) {
            if (loadedCount < defaultDataSize) {

              client.multi().hmset('media:' + medium.id, 'mediaData', JSON.stringify(medium))
              .sadd('mediaList', 'media:'+medium.id)
              .set('comments_'+'media:' + medium.id, medium.commentCount)
              .set('likes_'+'media:' + medium.id, medium.likeCount)
              .set('createdAt_'+'media:' + medium.id, medium.createdAt)
              .exec(function (err, replies) {console.log(err);console.log(replies);});

              loadedCount += 1;
              console.log(loadedCount);
            } else {
              console.log('dataset limit reached')
              reject({err: 'dataset limit is reached'});
            }
          });

          // if loop true, and if limit hasnt been reached
          if (options['loop'] && loadedCount < defaultDataSize) {
            getMediaData(client, regularMediaCount, {loop: true});
          } else {
            console.log('ABOUT TO RESOLVE');
            resolve(media);
          }

        }, function(err) {
          console.log('rejected', err);
          reject({err: 'something went wrong'});
        });

      });

    return promise;
  };

  return {
    init: function(client, callback) {
      console.log('init media count: ', initMediaCount);

      getMediaData(client, initMediaCount, {loop: false})
        .then(function(mediaData) {
          console.log('received callback');
          callback(mediaData);
        }, function(err) {
          callback(err);
        });

    },
    prepareDataset: function(client) {
      console.log('about to get media');
      getMediaData(client, regularMediaCount, {loop: true})
      .then(function(mediaData) {
        console.log('done loading')
      }, function(err) {
        console.log(err);
      })


    },
    get: function(client, options, callback) {
      // sort by param, then return 10 posts
      var sortBy = options.sortBy,
        offset = options.offset || defaultClientOffset,
        limit = options.limit || defaultClientLimit,
        result = [];

      client.sort('mediaList', 'by', sortBy + '_*', 'desc', function(err, replies) {

        console.log('sort err: ', err)

        replies.forEach(function(reply, i) {
          client.hgetall(reply, function(err, obj) {

            result.push(JSON.parse(obj.mediaData));

            // if result is filled, callback
            if (Object.keys(result).length === limit) {
              console.log('printing result: ', result);
              callback(result);
            }
          });
        })

      })

    }

  };
})();
