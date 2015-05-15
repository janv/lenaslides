'use strict';

function ApplicationController($scope, ngAudio, $location, $route){
  this.slideshow = null;

  $scope.$watch('slideshow.currentSlide', slideChanged);
  $scope.$on('$routeChangeSuccess', routeChanged);

  function slideChanged(newSlide) {
    if (!newSlide) return;
    $location.path('/'+newSlide.id);
  }

  function routeChanged() {
    if ($route.current.pathParams.slideId) {
      $scope.slideshow.navigateToId($route.current.pathParams.slideId);
    } else {
      $scope.slideshow.navigateToFirst();
    }
  }
}

ApplicationController.$inject = ['$scope', 'ngAudio', '$location', '$route'];

module.exports = ApplicationController;
