'use strict';

module.exports = function ApplicationController($scope, ngAudio){
  var app = this;
  this.slideshow = null;
  this.currentSound = null;

  this.playSound = playSound;
  this.stopSound = stopSound;

  $scope.$watch('slideshow.currentSlide', slideChanged);

  function playSound(file) {
    app.stopSound();
    app.currentSound = ngAudio.play('/audio/'+file);
  }

  function stopSound() {
    if (app.currentSound) app.currentSound.stop();
  }

  function slideChanged(newSlide) {
    if (newSlide && newSlide.mp3) {
      playSound(newSlide.mp3);
    } else {
      stopSound();
    }
  }
};
