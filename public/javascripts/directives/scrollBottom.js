angular.module('9g-gallery').directive('scrollBottom', function() {
  console.log('reached directive');

  return function(scope, el, attr) {
    var currentEl = el[0];

    el.bind('scroll', function() {
      if (currentEl.scrollTop + currentEl.offsetHeight >= currentEl.scrollHeight - 1) {
          scope.$apply(attr.scrollBottom);
      }
    });
  };
});
