angular.module('9g-gallery').service('RequestService', function ($http) {
  this.urls = {
    posts: '/api/posts'
  };

  this.getInitialPosts = function(callback) {
    var url = this.urls.posts;

    $http.get(url)
      .then(function(response) {
        console.log('got response back');
        console.log(response.data);
        // if (response.data[searchTerm]) {
        //   callback(response.data[searchTerm]);
        // } else {
          callback();
        // }

      });
  };

  this.getPosts = function(summonerId, callback) {
    var url = this.urls.posts + '?sortBy';

    $http.get(url)
      .then(function(response) {
        if (response.data[summonerId]) {
          callback(response.data[summonerId]);
        } else {
          callback();
        }
      });
  };

});
