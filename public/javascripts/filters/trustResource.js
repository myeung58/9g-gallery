angular.module('9g-gallery').filter('trustResource', function ($sce) {
  return function (resource) {
    return $sce.trustAsResourceUrl(resource);
  };
});
