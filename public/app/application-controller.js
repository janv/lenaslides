'use strict';

module.exports = function ApplicationController($scope, ngAudio, $location, $route){
  this.slideshow = null;

  this.stopSound = stopSound;

  $scope.$watch('slideshow.currentSlide', slideChanged);
  $scope.$on('$routeChangeSuccess', routeChanged);

  function stopSound() {
    var audio = $scope.slideshow.currentSlide.getAudio();
    if (audio) audio.stop();
  }

  function slideChanged(newSlide, oldSlide) {
    if (!newSlide) return;

    if (oldSlide && oldSlide.getAudio()) {
      oldSlide.getAudio().stop();
    }
    if (newSlide.getAudio()) {
      newSlide.getAudio().play();
    }

    $location.path('/'+newSlide.id);
  }

  function routeChanged() {
    if ($route.current.pathParams.slideId) {
      $scope.slideshow.navigateToId($route.current.pathParams.slideId);
    } else {
      $scope.slideshow.navigateToFirst();
    }
  }
};
