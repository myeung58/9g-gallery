angular.module('9g-gallery').filter("trustResource", ['$sce', function ($sce) {
    return function (resource) {
      console.log(resource);
      return $sce.trustAsResourceUrl(resource);
    };
  }]);
