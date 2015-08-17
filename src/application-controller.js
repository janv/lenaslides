'use strict';

function ApplicationController($scope, ngAudio, $location, $route){
  this.slideshow = null;
  var slideNumbers = [ 1,  2,  3,  4,  5,      7,  8,  9, 10,
                      11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
                      21, 22, 23, 24, 25 ];
  this.slideDatas = slideNumbers.map(function(no){
    return {
      id: '' + no,
      video: 'video/' + no + '.mp4',
      poster: 'video/' + no + '.png'
    };
  });

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
