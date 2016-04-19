angular.module('9g-gallery').filter('trustResource', function ($sce) {
  return function (resource) {
    console.log(resource);
    return $sce.trustAsResourceUrl(resource);
  };
});
