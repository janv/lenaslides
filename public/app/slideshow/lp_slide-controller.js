'use strict';

function LpSlideController($scope){
  this.slideshow = $scope.slideshow;
  this.slideshow.registerSlide(this);
}

LpSlideController.prototype.isVisible = function(){
    return this.slideshow.isSlideSelected(this);
};

LpSlideController.prototype.select = function(){
  this.slideshow.setCurrent(this);
  // Set up audio
};



module.exports = LpSlideController;
