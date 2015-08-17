'use strict';

module.exports = [ '$location', function($location){
  return {
    scope: true,
    controller: require('./lp_slide-controller.js'),
    controllerAs: 'slide',
    link: function(scope, elem){
      elem.find('video').on('ended', function(e){
        var id = scope.slideshow.getNextId();
        $location.path(id);
      });

      scope.$watch('slide.isVisible()', function(visible, old){
        var video = angular.element(elem).find('video')[0];
        if (visible) {
          video.play();
        } else {
          video.pause();
        }
      });
    }
  };
}];

