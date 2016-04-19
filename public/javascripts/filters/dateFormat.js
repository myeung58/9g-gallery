angular.module('9g-gallery').filter('dateFormat', function (moment) {
  var dateObj,
    relativeDate;

  return function (date) {
    dateObj = new Date(parseInt(date) * 1000);
    relativeDate = moment([
      dateObj.getFullYear(),
      dateObj.getMonth(),
      dateObj.getDate(),
      dateObj.getHours(),
      dateObj.getMinutes()
      ]).fromNow();

    return relativeDate;
  };
});
