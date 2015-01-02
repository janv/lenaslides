'use strict';

function LpSlideController($scope, $attrs, ngAudio){
  this._ngAudio = ngAudio;
  this.slideshow = $scope.slideshow;
  this.slideshow.registerSlide(this);
  this.mp3 = $attrs.mp3;
  this.id  = $attrs.id;

  this.getAudio();
}

LpSlideController.prototype.isVisible = function(){
    return this.slideshow.isSlideSelected(this);
};

LpSlideController.prototype.select = function(){
  this.slideshow.setCurrent(this);
};

LpSlideController.prototype.getAudio = function(){
  if (this.audio === undefined) {
    if (this.mp3) {
      this.audio = this._ngAudio.load('/audio/'+this.mp3);
      this.audio.loop = true;
    } else {
      this.audio = null;
    }
  }
  return this.audio;
};




module.exports = LpSlideController;
