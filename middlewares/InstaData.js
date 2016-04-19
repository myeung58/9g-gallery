var request = require('request');

var ApiRequest = require('./util/ApiRequest.js'),
  DataCleaner = require('./util/DataCleaner.js');

module.exports = (function() {
  var access_token = process.env.ACCESS_TOKEN,
    baseUrl = 'https://api.instagram.com/v1/users/259220806/media/recent?access_token=' + access_token,
    initMediaCount = 10, // to get 10 posts from instagram initially
    regularMediaCount = 25, // number of posts to retrieve per request
    defaultDataSize = 200, // get 200 posts from instagram
    loadedCount = 0, // to keep track of number of posts received
    maxIdString = '', // pagination with instagram api
    defaultClientOffset = 0,
    defaultClientLimit = 10,
    getMediaData;

  getMediaData = function(client, mediaCount, options) {

    var url = baseUrl + '&count=' + mediaCount + maxIdString,
      promise,
      media = {},
      client = client,
      options = options,
      dataSavable = true;

      promise = new Promise(function(resolve, reject) {
        ApiRequest.get(url).then(function(mediaData) {

          maxIdString = '&max_id=' + mediaData.pagination.next_max_id;
          media = DataCleaner.strip(mediaData.data);

          // save to redis
          media.forEach(function(medium) {
            if (loadedCount < defaultDataSize && dataSavable) {

              client.multi().hmset('media:' + medium.id, 'mediaData', JSON.stringify(medium))
              .sadd('mediaList', 'media:'+medium.id)
              .set('comments_'+'media:' + medium.id, medium.commentCount)
              .set('likes_'+'media:' + medium.id, medium.likeCount)
              .set('createdAt_'+'media:' + medium.id, medium.createdAt)
              .exec(function (err, replies) { return; });

              loadedCount += 1;
            } else if (options['loop'] && dataSavable) {
              reject({err: 'dataset limit is reached'});
            } else if (dataSavable) {
              resolve(media);
              dataSavable = false;
            }
          });

          // if loop true, and if limit hasnt been reached
          if (options['loop'] && loadedCount < defaultDataSize) {
            getMediaData(client, regularMediaCount, {loop: true});
          } else {
            resolve(media);
          }

        }, function(err) {
          reject({err: 'something went wrong'});
        });

      });

    return promise;
  };

  return {
    init: function(client, callback) {
      getMediaData(client, initMediaCount, {loop: false})
        .then(function(mediaData) {
          callback(mediaData);
        }, function(err) {
          callback(err);
        });

    },
    prepareDataset: function(client) {
      getMediaData(client, regularMediaCount, {loop: true})
      .then(function(mediaData) {
        console.log('finished preparing dataset');
      }, function(err) {
        console.log(err);
      })


    },
    // normal query to handle paginated and sorted content
    get: function(client, options, callback) {
      // sort by param, then return 10 posts
      var sortBy = options.sortBy,
        offset = options.offset || defaultClientOffset,
        limit = options.limit || defaultClientLimit,
        result = [];

      client.sort('mediaList', 'by', sortBy + '_*', 'desc', 'limit', offset, limit, function(err, replies) {

        replies.forEach(function(reply, i) {
          client.hgetall(reply, function(err, obj) {

            result.push(JSON.parse(obj.mediaData));

            if (i === replies.length - 1) {
              callback(result);
            }
          });
        })

      })

    }

  };
})();
