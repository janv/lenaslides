'use strict';

function LpSlideController($scope, $attrs){
  var controller = this;
  this.id = $attrs.id;
  this.slideshow = $scope.slideshow;
  this.slideshow.registerSlide(this);

  $attrs.$observe('id', function(id){
    controller.id = id;
  });
}

LpSlideController.prototype.isVisible = function(){
    return this.slideshow.isSlideSelected(this);
};

LpSlideController.prototype.select = function(){
  this.slideshow.setCurrent(this);
};

LpSlideController.$inject = ['$scope', '$attrs'];

module.exports = LpSlideController;
