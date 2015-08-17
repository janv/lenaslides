'use strict';

var _ = require('lodash-node/modern');

function LpSlideshowController($scope){
  this.slides = [];
  this.currentSlide = null;

  $scope.app.slideshow = this;
}

LpSlideshowController.$inject = ['$scope'];

LpSlideshowController.prototype.registerSlide = function(slide){
  this.slides.push(slide);
};

LpSlideshowController.prototype.setCurrent = function(slide){
  this.currentSlide = slide;
};

LpSlideshowController.prototype.navigateToId = function(id){
  var slide = _.find(this.slides, {id: id});
  this.setCurrent(slide);
};

LpSlideshowController.prototype.navigateToFirst = function(){
  this.setCurrent(this.slides[0]);
};

LpSlideshowController.prototype.getNextId = function(){
  var currentIndex = _.findIndex(this.slides, this.currentSlide);
  return _.result(this.slides[(currentIndex+1) % this.slides.length], 'id');
};

LpSlideshowController.prototype.getPreviousId = function(){
  var currentIndex = _.findIndex(this.slides, this.currentSlide);
  if (currentIndex === 0) currentIndex = this.slides.length;
  return _.result(this.slides[currentIndex-1], 'id');
};

LpSlideshowController.prototype.isSlideSelected = function(slide){
  if (slide) {
    return this.currentSlide === slide;
  } else {
    return !!this.currentSlide;
  }
};

module.exports = LpSlideshowController;
