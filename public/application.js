(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"./":[function(require,module,exports){
'use strict';

var submodules = [
  require('./audioplayer'),
  require('./slideshow')
];

var moduleDependencies = [
  'ngAudio'
].concat(_.map(submodules, 'name'));

var lenaslides = angular.module('lenaslides', moduleDependencies);
lenaslides.controller('ApplicationController', require('./application-controller.js'));

module.exports = lenaslides;

},{"./application-controller.js":"/Users/jan/development/lenaslides/public/app/application-controller.js","./audioplayer":"/Users/jan/development/lenaslides/public/app/audioplayer/index.js","./slideshow":"/Users/jan/development/lenaslides/public/app/slideshow/index.js"}],"/Users/jan/development/lenaslides/public/app/application-controller.js":[function(require,module,exports){
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
module.exports = 'Audioplayer:\n<button ng-click="app.stopSound()">Stop</button>\n';
},{}],"/Users/jan/development/lenaslides/public/app/slideshow/index.js":[function(require,module,exports){
'use strict';

module.exports = angular.module('lenaslides.slideshow', [])
  .directive('lpSlideshow', require('./lp_slideshow-directive.js'))
  .directive('lpSlide', require('./lp_slide-directive.js'));


},{"./lp_slide-directive.js":"/Users/jan/development/lenaslides/public/app/slideshow/lp_slide-directive.js","./lp_slideshow-directive.js":"/Users/jan/development/lenaslides/public/app/slideshow/lp_slideshow-directive.js"}],"/Users/jan/development/lenaslides/public/app/slideshow/lp_slide-controller.js":[function(require,module,exports){
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
  if (!this.isSlideSelected()) slide.select();
};

LpSlideshowController.prototype.setCurrent = function(slide){
  this.currentSlide = slide;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi8uLiIsImFwcGxpY2F0aW9uLWNvbnRyb2xsZXIuanMiLCJhdWRpb3BsYXllci9pbmRleC5qcyIsImF1ZGlvcGxheWVyL2xwX2F1ZGlvcGxheWVyLWNvbnRyb2xsZXIuanMiLCJhdWRpb3BsYXllci9scF9hdWRpb3BsYXllci1kaXJlY3RpdmUuanMiLCJhdWRpb3BsYXllci9scF9hdWRpb3BsYXllci5odG1sIiwic2xpZGVzaG93L2luZGV4LmpzIiwic2xpZGVzaG93L2xwX3NsaWRlLWNvbnRyb2xsZXIuanMiLCJzbGlkZXNob3cvbHBfc2xpZGUtZGlyZWN0aXZlLmpzIiwic2xpZGVzaG93L2xwX3NsaWRlc2hvdy1jb250cm9sbGVyLmpzIiwic2xpZGVzaG93L2xwX3NsaWRlc2hvdy1kaXJlY3RpdmUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1RBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIndXNlIHN0cmljdCc7XG5cbnZhciBzdWJtb2R1bGVzID0gW1xuICByZXF1aXJlKCcuL2F1ZGlvcGxheWVyJyksXG4gIHJlcXVpcmUoJy4vc2xpZGVzaG93Jylcbl07XG5cbnZhciBtb2R1bGVEZXBlbmRlbmNpZXMgPSBbXG4gICduZ0F1ZGlvJ1xuXS5jb25jYXQoXy5tYXAoc3VibW9kdWxlcywgJ25hbWUnKSk7XG5cbnZhciBsZW5hc2xpZGVzID0gYW5ndWxhci5tb2R1bGUoJ2xlbmFzbGlkZXMnLCBtb2R1bGVEZXBlbmRlbmNpZXMpO1xubGVuYXNsaWRlcy5jb250cm9sbGVyKCdBcHBsaWNhdGlvbkNvbnRyb2xsZXInLCByZXF1aXJlKCcuL2FwcGxpY2F0aW9uLWNvbnRyb2xsZXIuanMnKSk7XG5cbm1vZHVsZS5leHBvcnRzID0gbGVuYXNsaWRlcztcbiIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBBcHBsaWNhdGlvbkNvbnRyb2xsZXIoJHNjb3BlLCBuZ0F1ZGlvKXtcbiAgdmFyIGFwcCA9IHRoaXM7XG4gIHRoaXMuc2xpZGVzaG93ID0gbnVsbDtcbiAgdGhpcy5jdXJyZW50U291bmQgPSBudWxsO1xuXG4gIHRoaXMucGxheVNvdW5kID0gcGxheVNvdW5kO1xuICB0aGlzLnN0b3BTb3VuZCA9IHN0b3BTb3VuZDtcblxuICAkc2NvcGUuJHdhdGNoKCdzbGlkZXNob3cuY3VycmVudFNsaWRlJywgc2xpZGVDaGFuZ2VkKTtcblxuICBmdW5jdGlvbiBwbGF5U291bmQoZmlsZSkge1xuICAgIGFwcC5zdG9wU291bmQoKTtcbiAgICBhcHAuY3VycmVudFNvdW5kID0gbmdBdWRpby5wbGF5KCcvYXVkaW8vJytmaWxlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHN0b3BTb3VuZCgpIHtcbiAgICBpZiAoYXBwLmN1cnJlbnRTb3VuZCkgYXBwLmN1cnJlbnRTb3VuZC5zdG9wKCk7XG4gIH1cblxuICBmdW5jdGlvbiBzbGlkZUNoYW5nZWQobmV3U2xpZGUpIHtcbiAgICBpZiAobmV3U2xpZGUgJiYgbmV3U2xpZGUubXAzKSB7XG4gICAgICBwbGF5U291bmQobmV3U2xpZGUubXAzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3RvcFNvdW5kKCk7XG4gICAgfVxuICB9XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGFuZ3VsYXIubW9kdWxlKCdsZW5hc2xpZGVzLmF1ZGlvcGxheWVyJywgW10pXG4gIC5kaXJlY3RpdmUoJ2xwQXVkaW9wbGF5ZXInLCByZXF1aXJlKCcuL2xwX2F1ZGlvcGxheWVyLWRpcmVjdGl2ZS5qcycpKTtcbiIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBMcEF1ZGlvcGxheWVyQ29udHJvbGxlcigkc2NvcGUpe1xuICBjb25zb2xlLmxvZygnTHBBdWRpb3BsYXllckNvbnRyb2xsZXIgY29udHJvbGxlcicsICRzY29wZSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCl7XG4gIHJldHVybiB7XG4gICAgdGVtcGxhdGU6ICAgcmVxdWlyZSgnLi9scF9hdWRpb3BsYXllci5odG1sJyksXG4gICAgY29udHJvbGxlcjogcmVxdWlyZSgnLi9scF9hdWRpb3BsYXllci1jb250cm9sbGVyLmpzJyksXG4gICAgY29udHJvbGxlckFzOiAncGxheWVyJ1xuICB9O1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gJ0F1ZGlvcGxheWVyOlxcbjxidXR0b24gbmctY2xpY2s9XCJhcHAuc3RvcFNvdW5kKClcIj5TdG9wPC9idXR0b24+XFxuJzsiLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gYW5ndWxhci5tb2R1bGUoJ2xlbmFzbGlkZXMuc2xpZGVzaG93JywgW10pXG4gIC5kaXJlY3RpdmUoJ2xwU2xpZGVzaG93JywgcmVxdWlyZSgnLi9scF9zbGlkZXNob3ctZGlyZWN0aXZlLmpzJykpXG4gIC5kaXJlY3RpdmUoJ2xwU2xpZGUnLCByZXF1aXJlKCcuL2xwX3NsaWRlLWRpcmVjdGl2ZS5qcycpKTtcblxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBMcFNsaWRlQ29udHJvbGxlcigkc2NvcGUsICRhdHRycyl7XG4gIHRoaXMuc2xpZGVzaG93ID0gJHNjb3BlLnNsaWRlc2hvdztcbiAgdGhpcy5zbGlkZXNob3cucmVnaXN0ZXJTbGlkZSh0aGlzKTtcbiAgdGhpcy5tcDMgPSAkYXR0cnMubXAzO1xufVxuXG5McFNsaWRlQ29udHJvbGxlci5wcm90b3R5cGUuaXNWaXNpYmxlID0gZnVuY3Rpb24oKXtcbiAgICByZXR1cm4gdGhpcy5zbGlkZXNob3cuaXNTbGlkZVNlbGVjdGVkKHRoaXMpO1xufTtcblxuTHBTbGlkZUNvbnRyb2xsZXIucHJvdG90eXBlLnNlbGVjdCA9IGZ1bmN0aW9uKCl7XG4gIHRoaXMuc2xpZGVzaG93LnNldEN1cnJlbnQodGhpcyk7XG59O1xuXG5cblxubW9kdWxlLmV4cG9ydHMgPSBMcFNsaWRlQ29udHJvbGxlcjtcbiIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpe1xuICByZXR1cm4ge1xuICAgIHNjb3BlOiB0cnVlLFxuICAgIGNvbnRyb2xsZXI6IHJlcXVpcmUoJy4vbHBfc2xpZGUtY29udHJvbGxlci5qcycpLFxuICAgIGNvbnRyb2xsZXJBczogJ3NsaWRlJ1xuICB9O1xufTtcblxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBMcFNsaWRlc2hvd0NvbnRyb2xsZXIoJHNjb3BlKXtcbiAgdGhpcy5zbGlkZXMgPSBbXTtcbiAgdGhpcy5jdXJyZW50U2xpZGUgPSBudWxsO1xuXG4gICRzY29wZS5hcHAuc2xpZGVzaG93ID0gdGhpcztcbn1cblxuTHBTbGlkZXNob3dDb250cm9sbGVyLnByb3RvdHlwZS5yZWdpc3RlclNsaWRlID0gZnVuY3Rpb24oc2xpZGUpe1xuICB0aGlzLnNsaWRlcy5wdXNoKHNsaWRlKTtcbiAgaWYgKCF0aGlzLmlzU2xpZGVTZWxlY3RlZCgpKSBzbGlkZS5zZWxlY3QoKTtcbn07XG5cbkxwU2xpZGVzaG93Q29udHJvbGxlci5wcm90b3R5cGUuc2V0Q3VycmVudCA9IGZ1bmN0aW9uKHNsaWRlKXtcbiAgdGhpcy5jdXJyZW50U2xpZGUgPSBzbGlkZTtcbn07XG5cbkxwU2xpZGVzaG93Q29udHJvbGxlci5wcm90b3R5cGUuaXNTbGlkZVNlbGVjdGVkID0gZnVuY3Rpb24oc2xpZGUpe1xuICBpZiAoc2xpZGUpIHtcbiAgICByZXR1cm4gdGhpcy5jdXJyZW50U2xpZGUgPT09IHNsaWRlO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiAhIXRoaXMuY3VycmVudFNsaWRlO1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IExwU2xpZGVzaG93Q29udHJvbGxlcjtcbiIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpe1xuICByZXR1cm4ge1xuICAgIGNvbnRyb2xsZXI6IHJlcXVpcmUoJy4vbHBfc2xpZGVzaG93LWNvbnRyb2xsZXIuanMnKSxcbiAgICBjb250cm9sbGVyQXM6ICdzbGlkZXNob3cnXG4gIH07XG59O1xuIl19
