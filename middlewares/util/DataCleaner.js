var DataCleaner = (function() {
  return {
    strip: function(dataArr) {
      var savableData = [];

      dataArr.forEach(function(data) {
        var savableObj = {},
          id = data.id;

        savableObj = {};
        savableObj.id = data.id;
        savableObj.type = data.type;
        savableObj.commentCount = data.comments.count;
        savableObj.likeCount = data.likes.count;
        savableObj.createdAt = data.created_time;
        savableObj.link = data.link;
        savableObj.caption = data.caption.text;
        savableObj.images = {
          lowRes: data.images.low_resolution.url,
          stdRes: data.images.standard_resolution.url
        };

        if ('videos' in data) {
          savableObj.videos = {
            lowRes: data.videos.low_resolution.url,
            stdRes: data.videos.standard_resolution.url
          };
        }

        savableData.push(savableObj);
      });

      return savableData;
    }
  };
})();

module.exports = DataCleaner;
