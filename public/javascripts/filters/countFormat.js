angular.module('9g-gallery').filter('countFormat', function () {
  var formattedCount;

  return function (count) {
    if (count > 999 && count < 1000000) {
      formattedCount = (count / 1000).toFixed(1) + 'k';
    } else if (count > 1000000) {
      formattedCount = (count / 1000000).toFixed(1) + 'k';
    } else {
      formattedCount = toString(count);
    }

    return formattedCount.replace('.0', '');
  };
});
