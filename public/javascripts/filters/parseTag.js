angular.module('9g-gallery').filter('parseTag', function ($sce) {
  var urls = {
    show: 'https://www.instagram.com/',
    search: 'https://www.instagram.com/explore/tags/'
  };

  makeLink = function(url, text) {
    return '<a class=\"caption-link\" href=\"' + url + '\" target=\"_blank\">' + text + '</a>';
  };

  return function (caption) {
    var parsedCaption = caption;

    parsedCaption = parsedCaption
      .replace(/[@]+[A-Za-z0-9-_]+/g, function(u) {
      var url = urls.show + u.substring(1);
      return makeLink(url, u);
    }).replace(/[#]+[A-Za-z0-9-_]+/g, function(t) {
      var url = urls.search + t.substring(1);
      return makeLink(url, t);
    });

    return $sce.trustAsHtml(parsedCaption);
  };
});
