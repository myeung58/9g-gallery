angular.module('9g-gallery').controller('mainController', function($scope, RequestService) {
  $scope.posts = [];
  $scope.loading = false;
  $scope.current = {
    sortBy: '',
    offset: 10,
    limit: 10
  };

  // send request to backend api to get inital posts
  $scope.init = function() {
    if ($scope.posts.length) { $scope.resetContent(); };

    $scope.current.offset = 0;
    $scope.loading = true;

    RequestService.getInitialPosts($scope.updatePostContent);
  };

  // tell backend to sort and get sorted posts
  $scope.sortPostsBy = function(sortBy) {
    if ($scope.isCurrentSort(sortBy)) { return; }

    $scope.resetContent();
    $scope.current.sortBy = sortBy;
    $scope.loading = true;

    RequestService.getPosts($scope.current, $scope.updatePostContent);
  };

  // get paginated posts based on current sort pattern
  $scope.onScrollBottom = function() {
    if (!$scope.loading) {
      $scope.loading = true;
      $scope.current.offset = $scope.posts.length;

      RequestService.getPosts($scope.current, $scope.updatePostContent);
    }
  };

  // update the list of presentable posts
  $scope.updatePostContent = function(posts) {
    $scope.loading = false;
    Array.prototype.push.apply($scope.posts, posts);
  };

  $scope.isCurrentSort = function(sortBy) {
    return $scope.current.sortBy === sortBy;
  };

  $scope.pin = function(post) {
    console.log('about to pin', post);
    RequestService.pinPost(post, function() {
      // render post as pinned
      post.pinned = true;
      console.log(post);
      // move post to pinned post group
    });
  };

  $scope.unpin = function(post) {
    console.log('about to unpin', post);
    RequestService.unpinPost(post, function() {
      // render post as unpinned
      post.pinned = false;
      console.log(post);
      // move post to pinned post group
    });
  };

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
