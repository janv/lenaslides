(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"./":[function(require,module,exports){
'use strict';

var submodules = [
  require('./audioplayer'),
  require('./slideshow')
];

var moduleDependencies = [
  'ngAudio',
  'ngRoute'
].concat(_.map(submodules, 'name'));

var lenaslides = angular.module('lenaslides', moduleDependencies);
lenaslides.controller('ApplicationController', require('./application-controller.js'));
lenaslides.config(function($routeProvider){
  $routeProvider.when('/:slideId', {});
  $routeProvider.otherwise({});
});

module.exports = lenaslides;

},{"./application-controller.js":"/Users/jan/development/lenaslides/public/app/application-controller.js","./audioplayer":"/Users/jan/development/lenaslides/public/app/audioplayer/index.js","./slideshow":"/Users/jan/development/lenaslides/public/app/slideshow/index.js"}],"/Users/jan/development/lenaslides/public/app/application-controller.js":[function(require,module,exports){
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

},{}],"/Users/jan/development/lenaslides/public/app/audioplayer/index.js":[function(require,module,exports){
'use strict';

module.exports = angular.module('lenaslides.audioplayer', [])
  .directive('lpAudioplayer', require('./lp_audioplayer-directive.js'));

},{"./lp_audioplayer-directive.js":"/Users/jan/development/lenaslides/public/app/audioplayer/lp_audioplayer-directive.js"}],"/Users/jan/development/lenaslides/public/app/audioplayer/lp_audioplayer-controller.js":[function(require,module,exports){
'use strict';

module.exports = function LpAudioplayerController($scope){
  console.log('LpAudioplayerController controller', $scope);
};

},{}],"/Users/jan/development/lenaslides/public/app/audioplayer/lp_audioplayer-directive.js":[function(require,module,exports){
'use strict';

module.exports = function(){
  return {
    template:   require('./lp_audioplayer.html'),
    controller: require('./lp_audioplayer-controller.js'),
    controllerAs: 'player'
  };
};

},{"./lp_audioplayer-controller.js":"/Users/jan/development/lenaslides/public/app/audioplayer/lp_audioplayer-controller.js","./lp_audioplayer.html":"/Users/jan/development/lenaslides/public/app/audioplayer/lp_audioplayer.html"}],"/Users/jan/development/lenaslides/public/app/audioplayer/lp_audioplayer.html":[function(require,module,exports){
module.exports = '<a ng-click="app.stopSound()" class="fading">\n  <i class="mute-button fa fa-pause"></i>\n</a>\n';
},{}],"/Users/jan/development/lenaslides/public/app/slideshow/index.js":[function(require,module,exports){
'use strict';

module.exports = angular.module('lenaslides.slideshow', [])
  .directive('lpSlideshow', require('./lp_slideshow-directive.js'))
  .directive('lpSlide', require('./lp_slide-directive.js'));


},{"./lp_slide-directive.js":"/Users/jan/development/lenaslides/public/app/slideshow/lp_slide-directive.js","./lp_slideshow-directive.js":"/Users/jan/development/lenaslides/public/app/slideshow/lp_slideshow-directive.js"}],"/Users/jan/development/lenaslides/public/app/slideshow/lp_slide-controller.js":[function(require,module,exports){
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
      this.audio = this._ngAudio.load('audio/'+this.mp3);
      this.audio.loop = true;
    } else {
      this.audio = null;
    }
  }
  return this.audio;
};




module.exports = LpSlideController;

},{}],"/Users/jan/development/lenaslides/public/app/slideshow/lp_slide-directive.js":[function(require,module,exports){
'use strict';

module.exports = function(){
  return {
    scope: true,
    controller: require('./lp_slide-controller.js'),
    controllerAs: 'slide'
  };
};


},{"./lp_slide-controller.js":"/Users/jan/development/lenaslides/public/app/slideshow/lp_slide-controller.js"}],"/Users/jan/development/lenaslides/public/app/slideshow/lp_slideshow-controller.js":[function(require,module,exports){
'use strict';

function LpSlideshowController($scope){
  this.slides = [];
  this.currentSlide = null;

  $scope.app.slideshow = this;
}

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
  return _.result(this.slides[currentIndex+1], 'id');
};

LpSlideshowController.prototype.getPreviousId = function(){
  var currentIndex = _.findIndex(this.slides, this.currentSlide);
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

},{}],"/Users/jan/development/lenaslides/public/app/slideshow/lp_slideshow-directive.js":[function(require,module,exports){
'use strict';

module.exports = function(){
  return {
    controller: require('./lp_slideshow-controller.js'),
    controllerAs: 'slideshow'
  };
};

},{"./lp_slideshow-controller.js":"/Users/jan/development/lenaslides/public/app/slideshow/lp_slideshow-controller.js"}]},{},["./"])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi8uLiIsImFwcGxpY2F0aW9uLWNvbnRyb2xsZXIuanMiLCJhdWRpb3BsYXllci9pbmRleC5qcyIsImF1ZGlvcGxheWVyL2xwX2F1ZGlvcGxheWVyLWNvbnRyb2xsZXIuanMiLCJhdWRpb3BsYXllci9scF9hdWRpb3BsYXllci1kaXJlY3RpdmUuanMiLCJhdWRpb3BsYXllci9scF9hdWRpb3BsYXllci5odG1sIiwic2xpZGVzaG93L2luZGV4LmpzIiwic2xpZGVzaG93L2xwX3NsaWRlLWNvbnRyb2xsZXIuanMiLCJzbGlkZXNob3cvbHBfc2xpZGUtZGlyZWN0aXZlLmpzIiwic2xpZGVzaG93L2xwX3NsaWRlc2hvdy1jb250cm9sbGVyLmpzIiwic2xpZGVzaG93L2xwX3NsaWRlc2hvdy1kaXJlY3RpdmUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNUQTs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIid1c2Ugc3RyaWN0JztcblxudmFyIHN1Ym1vZHVsZXMgPSBbXG4gIHJlcXVpcmUoJy4vYXVkaW9wbGF5ZXInKSxcbiAgcmVxdWlyZSgnLi9zbGlkZXNob3cnKVxuXTtcblxudmFyIG1vZHVsZURlcGVuZGVuY2llcyA9IFtcbiAgJ25nQXVkaW8nLFxuICAnbmdSb3V0ZSdcbl0uY29uY2F0KF8ubWFwKHN1Ym1vZHVsZXMsICduYW1lJykpO1xuXG52YXIgbGVuYXNsaWRlcyA9IGFuZ3VsYXIubW9kdWxlKCdsZW5hc2xpZGVzJywgbW9kdWxlRGVwZW5kZW5jaWVzKTtcbmxlbmFzbGlkZXMuY29udHJvbGxlcignQXBwbGljYXRpb25Db250cm9sbGVyJywgcmVxdWlyZSgnLi9hcHBsaWNhdGlvbi1jb250cm9sbGVyLmpzJykpO1xubGVuYXNsaWRlcy5jb25maWcoZnVuY3Rpb24oJHJvdXRlUHJvdmlkZXIpe1xuICAkcm91dGVQcm92aWRlci53aGVuKCcvOnNsaWRlSWQnLCB7fSk7XG4gICRyb3V0ZVByb3ZpZGVyLm90aGVyd2lzZSh7fSk7XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBsZW5hc2xpZGVzO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIEFwcGxpY2F0aW9uQ29udHJvbGxlcigkc2NvcGUsIG5nQXVkaW8sICRsb2NhdGlvbiwgJHJvdXRlKXtcbiAgdGhpcy5zbGlkZXNob3cgPSBudWxsO1xuXG4gIHRoaXMuc3RvcFNvdW5kID0gc3RvcFNvdW5kO1xuXG4gICRzY29wZS4kd2F0Y2goJ3NsaWRlc2hvdy5jdXJyZW50U2xpZGUnLCBzbGlkZUNoYW5nZWQpO1xuICAkc2NvcGUuJG9uKCckcm91dGVDaGFuZ2VTdWNjZXNzJywgcm91dGVDaGFuZ2VkKTtcblxuICBmdW5jdGlvbiBzdG9wU291bmQoKSB7XG4gICAgdmFyIGF1ZGlvID0gJHNjb3BlLnNsaWRlc2hvdy5jdXJyZW50U2xpZGUuZ2V0QXVkaW8oKTtcbiAgICBpZiAoYXVkaW8pIGF1ZGlvLnN0b3AoKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNsaWRlQ2hhbmdlZChuZXdTbGlkZSwgb2xkU2xpZGUpIHtcbiAgICBpZiAoIW5ld1NsaWRlKSByZXR1cm47XG5cbiAgICBpZiAob2xkU2xpZGUgJiYgb2xkU2xpZGUuZ2V0QXVkaW8oKSkge1xuICAgICAgb2xkU2xpZGUuZ2V0QXVkaW8oKS5zdG9wKCk7XG4gICAgfVxuICAgIGlmIChuZXdTbGlkZS5nZXRBdWRpbygpKSB7XG4gICAgICBuZXdTbGlkZS5nZXRBdWRpbygpLnBsYXkoKTtcbiAgICB9XG5cbiAgICAkbG9jYXRpb24ucGF0aCgnLycrbmV3U2xpZGUuaWQpO1xuICB9XG5cbiAgZnVuY3Rpb24gcm91dGVDaGFuZ2VkKCkge1xuICAgIGlmICgkcm91dGUuY3VycmVudC5wYXRoUGFyYW1zLnNsaWRlSWQpIHtcbiAgICAgICRzY29wZS5zbGlkZXNob3cubmF2aWdhdGVUb0lkKCRyb3V0ZS5jdXJyZW50LnBhdGhQYXJhbXMuc2xpZGVJZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICRzY29wZS5zbGlkZXNob3cubmF2aWdhdGVUb0ZpcnN0KCk7XG4gICAgfVxuICB9XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGFuZ3VsYXIubW9kdWxlKCdsZW5hc2xpZGVzLmF1ZGlvcGxheWVyJywgW10pXG4gIC5kaXJlY3RpdmUoJ2xwQXVkaW9wbGF5ZXInLCByZXF1aXJlKCcuL2xwX2F1ZGlvcGxheWVyLWRpcmVjdGl2ZS5qcycpKTtcbiIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBMcEF1ZGlvcGxheWVyQ29udHJvbGxlcigkc2NvcGUpe1xuICBjb25zb2xlLmxvZygnTHBBdWRpb3BsYXllckNvbnRyb2xsZXIgY29udHJvbGxlcicsICRzY29wZSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCl7XG4gIHJldHVybiB7XG4gICAgdGVtcGxhdGU6ICAgcmVxdWlyZSgnLi9scF9hdWRpb3BsYXllci5odG1sJyksXG4gICAgY29udHJvbGxlcjogcmVxdWlyZSgnLi9scF9hdWRpb3BsYXllci1jb250cm9sbGVyLmpzJyksXG4gICAgY29udHJvbGxlckFzOiAncGxheWVyJ1xuICB9O1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gJzxhIG5nLWNsaWNrPVwiYXBwLnN0b3BTb3VuZCgpXCIgY2xhc3M9XCJmYWRpbmdcIj5cXG4gIDxpIGNsYXNzPVwibXV0ZS1idXR0b24gZmEgZmEtcGF1c2VcIj48L2k+XFxuPC9hPlxcbic7IiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGFuZ3VsYXIubW9kdWxlKCdsZW5hc2xpZGVzLnNsaWRlc2hvdycsIFtdKVxuICAuZGlyZWN0aXZlKCdscFNsaWRlc2hvdycsIHJlcXVpcmUoJy4vbHBfc2xpZGVzaG93LWRpcmVjdGl2ZS5qcycpKVxuICAuZGlyZWN0aXZlKCdscFNsaWRlJywgcmVxdWlyZSgnLi9scF9zbGlkZS1kaXJlY3RpdmUuanMnKSk7XG5cbiIsIid1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gTHBTbGlkZUNvbnRyb2xsZXIoJHNjb3BlLCAkYXR0cnMsIG5nQXVkaW8pe1xuICB0aGlzLl9uZ0F1ZGlvID0gbmdBdWRpbztcbiAgdGhpcy5zbGlkZXNob3cgPSAkc2NvcGUuc2xpZGVzaG93O1xuICB0aGlzLnNsaWRlc2hvdy5yZWdpc3RlclNsaWRlKHRoaXMpO1xuICB0aGlzLm1wMyA9ICRhdHRycy5tcDM7XG4gIHRoaXMuaWQgID0gJGF0dHJzLmlkO1xuXG4gIHRoaXMuZ2V0QXVkaW8oKTtcbn1cblxuTHBTbGlkZUNvbnRyb2xsZXIucHJvdG90eXBlLmlzVmlzaWJsZSA9IGZ1bmN0aW9uKCl7XG4gICAgcmV0dXJuIHRoaXMuc2xpZGVzaG93LmlzU2xpZGVTZWxlY3RlZCh0aGlzKTtcbn07XG5cbkxwU2xpZGVDb250cm9sbGVyLnByb3RvdHlwZS5zZWxlY3QgPSBmdW5jdGlvbigpe1xuICB0aGlzLnNsaWRlc2hvdy5zZXRDdXJyZW50KHRoaXMpO1xufTtcblxuTHBTbGlkZUNvbnRyb2xsZXIucHJvdG90eXBlLmdldEF1ZGlvID0gZnVuY3Rpb24oKXtcbiAgaWYgKHRoaXMuYXVkaW8gPT09IHVuZGVmaW5lZCkge1xuICAgIGlmICh0aGlzLm1wMykge1xuICAgICAgdGhpcy5hdWRpbyA9IHRoaXMuX25nQXVkaW8ubG9hZCgnYXVkaW8vJyt0aGlzLm1wMyk7XG4gICAgICB0aGlzLmF1ZGlvLmxvb3AgPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmF1ZGlvID0gbnVsbDtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRoaXMuYXVkaW87XG59O1xuXG5cblxuXG5tb2R1bGUuZXhwb3J0cyA9IExwU2xpZGVDb250cm9sbGVyO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCl7XG4gIHJldHVybiB7XG4gICAgc2NvcGU6IHRydWUsXG4gICAgY29udHJvbGxlcjogcmVxdWlyZSgnLi9scF9zbGlkZS1jb250cm9sbGVyLmpzJyksXG4gICAgY29udHJvbGxlckFzOiAnc2xpZGUnXG4gIH07XG59O1xuXG4iLCIndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIExwU2xpZGVzaG93Q29udHJvbGxlcigkc2NvcGUpe1xuICB0aGlzLnNsaWRlcyA9IFtdO1xuICB0aGlzLmN1cnJlbnRTbGlkZSA9IG51bGw7XG5cbiAgJHNjb3BlLmFwcC5zbGlkZXNob3cgPSB0aGlzO1xufVxuXG5McFNsaWRlc2hvd0NvbnRyb2xsZXIucHJvdG90eXBlLnJlZ2lzdGVyU2xpZGUgPSBmdW5jdGlvbihzbGlkZSl7XG4gIHRoaXMuc2xpZGVzLnB1c2goc2xpZGUpO1xufTtcblxuTHBTbGlkZXNob3dDb250cm9sbGVyLnByb3RvdHlwZS5zZXRDdXJyZW50ID0gZnVuY3Rpb24oc2xpZGUpe1xuICB0aGlzLmN1cnJlbnRTbGlkZSA9IHNsaWRlO1xufTtcblxuTHBTbGlkZXNob3dDb250cm9sbGVyLnByb3RvdHlwZS5uYXZpZ2F0ZVRvSWQgPSBmdW5jdGlvbihpZCl7XG4gIHZhciBzbGlkZSA9IF8uZmluZCh0aGlzLnNsaWRlcywge2lkOiBpZH0pO1xuICB0aGlzLnNldEN1cnJlbnQoc2xpZGUpO1xufTtcblxuTHBTbGlkZXNob3dDb250cm9sbGVyLnByb3RvdHlwZS5uYXZpZ2F0ZVRvRmlyc3QgPSBmdW5jdGlvbigpe1xuICB0aGlzLnNldEN1cnJlbnQodGhpcy5zbGlkZXNbMF0pO1xufTtcblxuTHBTbGlkZXNob3dDb250cm9sbGVyLnByb3RvdHlwZS5nZXROZXh0SWQgPSBmdW5jdGlvbigpe1xuICB2YXIgY3VycmVudEluZGV4ID0gXy5maW5kSW5kZXgodGhpcy5zbGlkZXMsIHRoaXMuY3VycmVudFNsaWRlKTtcbiAgcmV0dXJuIF8ucmVzdWx0KHRoaXMuc2xpZGVzW2N1cnJlbnRJbmRleCsxXSwgJ2lkJyk7XG59O1xuXG5McFNsaWRlc2hvd0NvbnRyb2xsZXIucHJvdG90eXBlLmdldFByZXZpb3VzSWQgPSBmdW5jdGlvbigpe1xuICB2YXIgY3VycmVudEluZGV4ID0gXy5maW5kSW5kZXgodGhpcy5zbGlkZXMsIHRoaXMuY3VycmVudFNsaWRlKTtcbiAgcmV0dXJuIF8ucmVzdWx0KHRoaXMuc2xpZGVzW2N1cnJlbnRJbmRleC0xXSwgJ2lkJyk7XG59O1xuXG5McFNsaWRlc2hvd0NvbnRyb2xsZXIucHJvdG90eXBlLmlzU2xpZGVTZWxlY3RlZCA9IGZ1bmN0aW9uKHNsaWRlKXtcbiAgaWYgKHNsaWRlKSB7XG4gICAgcmV0dXJuIHRoaXMuY3VycmVudFNsaWRlID09PSBzbGlkZTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gISF0aGlzLmN1cnJlbnRTbGlkZTtcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBMcFNsaWRlc2hvd0NvbnRyb2xsZXI7XG4iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKXtcbiAgcmV0dXJuIHtcbiAgICBjb250cm9sbGVyOiByZXF1aXJlKCcuL2xwX3NsaWRlc2hvdy1jb250cm9sbGVyLmpzJyksXG4gICAgY29udHJvbGxlckFzOiAnc2xpZGVzaG93J1xuICB9O1xufTtcbiJdfQ==
