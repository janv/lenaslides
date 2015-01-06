'use strict';

function LpSlideController($scope, $attrs){
  this.id = $attrs.id;
  this.slideshow = $scope.slideshow;
  this.slideshow.registerSlide(this);
}

LpSlideController.prototype.isVisible = function(){
    return this.slideshow.isSlideSelected(this);
};

LpSlideController.prototype.select = function(){
  this.slideshow.setCurrent(this);
};

module.exports = LpSlideController;
