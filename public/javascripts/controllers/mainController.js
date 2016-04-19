angular.module('9g-gallery').controller('mainController', function($scope, RequestService) {

  $scope.posts = [];
  $scope.loading = false;
  $scope.current = {
    sortBy: '',
    offset: 10,
    limit: 10
  };

  // immediately send request to get 9gag posts
  $scope.init = function() {
    if ($scope.posts.length) { $scope.resetContent(); };

    $scope.current.offset = 0;
    $scope.loading = true;

    RequestService.getInitialPosts($scope.updatePostContent);
  };

  $scope.sortPostsBy = function(sortBy) {
    console.log(sortBy);
    if ($scope.isCurrentSort(sortBy)) { return; }

    $scope.resetContent();
    $scope.current.sortBy = sortBy;
    $scope.loading = true;

    RequestService.getPosts($scope.current, $scope.updatePostContent);
  };

  $scope.onScrollBottom = function() {
    console.log('reached bottom');

    // get paginated results based on currentSortBy
    console.log('loading: ', $scope.loading);
    if (!$scope.loading) {
      $scope.loading = true;

      // $scope.current.offset = $scope.posts.length;

      $scope.current.offset = 2;
      $scope.current.limit = 5;

      RequestService.getPosts($scope.current, $scope.updatePostContent);
    }
  };

  $scope.updatePostContent = function(posts) {
    $scope.loading = false;
    Array.prototype.push.apply($scope.posts, posts);
    console.log('updatd number of posts: ', $scope.posts.length);
  };

  $scope.isCurrentSort = function(sortBy) {
    return $scope.current.sortBy === sortBy;
  }

  $scope.resetContent = function() {
    $scope.posts = [];
    $scope.render = { loading: false };
    $scope.current = {
      sortBy: '',
      offset: 0,
      limit: 10
    };
  };

  $scope.init();

});
