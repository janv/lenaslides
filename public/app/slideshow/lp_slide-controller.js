'use strict';

function LpSlideController($scope, $attrs){
  this.slideshow = $scope.slideshow;
  this.slideshow.registerSlide(this);
  this.mp3 = $attrs.mp3;
}

LpSlideController.prototype.isVisible = function(){
    return this.slideshow.isSlideSelected(this);
};

LpSlideController.prototype.select = function(){
  this.slideshow.setCurrent(this);
};



module.exports = LpSlideController;
