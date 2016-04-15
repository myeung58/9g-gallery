angular.module('9g-gallery').controller('mainController', function($scope, RequestService) {
  console.log('reached main ctrl');

  $scope.posts = [];
  $scope.render = {
    loading: true
  };
  $scope.currentSort = 'date';

  $scope.getPosts = function() {};

  $scope.sortBy = function(param) {
    console.log(param);
    //
  };

  // immediately send request to get 9gag posts
  RequestService.getInitialPosts(function(posts) {
    console.log(posts);
    $scope.render.loading = false;
  });

});
