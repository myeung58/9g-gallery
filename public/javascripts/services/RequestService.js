angular.module('9g-gallery').service('RequestService', function ($http) {
  this.urls = {
    posts: '/api/posts'
  };

  this.getInitialPosts = function(callback) {
    var url = this.urls.posts;

    $http.get(url)
      .then(function(response) {
        console.log('got response back');

        if (response.data.length) {
          console.log('response ', response.data);
          callback(response.data);
        } else {
          callback();
        }

      }, function() {
        console.log('something went wrong');
      });
  };

  this.getPosts = function(options, callback) {
    var url = this.urls.posts + '?';

    if (options.sortBy) {
      console.log(options.sortBy);
      url = url + 'sortBy=' + options.sortBy;
    }

    if (options.offset) {
      console.log(options.offset);
      url = url + '&offset=' + options.offset;
    }

    if (options.limit) {
      console.log(options.limit);
      url = url + '&limit=' + options.limit;
    }

    console.log('about to get posts: ', url);

    $http.get(url)
      .then(function(response) {
        callback(response.data);
      }, function() {
        console.log('something went wrong');
      });
  };

});
