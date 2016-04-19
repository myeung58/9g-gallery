angular.module('9g-gallery').filter('dateFormat', function (moment) {
  var dateObj;

  return function (date) {
    dateObj = new Date(parseInt(date) * 1000);

    return moment([
      dateObj.getFullYear(),
      dateObj.getMonth(),
      dateObj.getDate(),
      dateObj.getHours(),
      dateObj.getMinutes()
      ]).fromNow();
  };
});
