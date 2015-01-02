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

module.exports = function ApplicationController(){
  this.slideshow = null;
};

},{}],"/Users/jan/development/lenaslides/public/app/audioplayer/index.js":[function(require,module,exports){
'use strict';

module.exports = angular.module('lenaslides.audioplayer', [])
  .directive('lpAudioplayer', require('./lp_audioplayer-directive.js'));

},{"./lp_audioplayer-directive.js":"/Users/jan/development/lenaslides/public/app/audioplayer/lp_audioplayer-directive.js"}],"/Users/jan/development/lenaslides/public/app/audioplayer/lp_audioplayer-controller.js":[function(require,module,exports){
'use strict';

module.exports = function LpAudioplayerController($scope){
  console.log('foo controller', $scope);
};

},{}],"/Users/jan/development/lenaslides/public/app/audioplayer/lp_audioplayer-directive.js":[function(require,module,exports){
'use strict';

module.exports = function(){
  return {
    template:   require('./lp_audioplayer.html'),
    controller: require('./lp_audioplayer-controller.js'),
    link: function(){
      console.log('foo');
    }
  };
};

},{"./lp_audioplayer-controller.js":"/Users/jan/development/lenaslides/public/app/audioplayer/lp_audioplayer-controller.js","./lp_audioplayer.html":"/Users/jan/development/lenaslides/public/app/audioplayer/lp_audioplayer.html"}],"/Users/jan/development/lenaslides/public/app/audioplayer/lp_audioplayer.html":[function(require,module,exports){
module.exports = '<strong>YOLO</strong>\n';
},{}],"/Users/jan/development/lenaslides/public/app/slideshow/index.js":[function(require,module,exports){
'use strict';

module.exports = angular.module('lenaslides.slideshow', [])
  .directive('lpSlideshow', require('./lp_slideshow-directive.js'))
  .directive('lpSlide', require('./lp_slide-directive.js'));


},{"./lp_slide-directive.js":"/Users/jan/development/lenaslides/public/app/slideshow/lp_slide-directive.js","./lp_slideshow-directive.js":"/Users/jan/development/lenaslides/public/app/slideshow/lp_slideshow-directive.js"}],"/Users/jan/development/lenaslides/public/app/slideshow/lp_slide-controller.js":[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi8uLiIsImFwcGxpY2F0aW9uLWNvbnRyb2xsZXIuanMiLCJhdWRpb3BsYXllci9pbmRleC5qcyIsImF1ZGlvcGxheWVyL2xwX2F1ZGlvcGxheWVyLWNvbnRyb2xsZXIuanMiLCJhdWRpb3BsYXllci9scF9hdWRpb3BsYXllci1kaXJlY3RpdmUuanMiLCJhdWRpb3BsYXllci9scF9hdWRpb3BsYXllci5odG1sIiwic2xpZGVzaG93L2luZGV4LmpzIiwic2xpZGVzaG93L2xwX3NsaWRlLWNvbnRyb2xsZXIuanMiLCJzbGlkZXNob3cvbHBfc2xpZGUtZGlyZWN0aXZlLmpzIiwic2xpZGVzaG93L2xwX3NsaWRlc2hvdy1jb250cm9sbGVyLmpzIiwic2xpZGVzaG93L2xwX3NsaWRlc2hvdy1kaXJlY3RpdmUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1hBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIndXNlIHN0cmljdCc7XG5cbnZhciBzdWJtb2R1bGVzID0gW1xuICByZXF1aXJlKCcuL2F1ZGlvcGxheWVyJyksXG4gIHJlcXVpcmUoJy4vc2xpZGVzaG93Jylcbl07XG5cbnZhciBtb2R1bGVEZXBlbmRlbmNpZXMgPSBbXG4gICduZ0F1ZGlvJ1xuXS5jb25jYXQoXy5tYXAoc3VibW9kdWxlcywgJ25hbWUnKSk7XG5cbnZhciBsZW5hc2xpZGVzID0gYW5ndWxhci5tb2R1bGUoJ2xlbmFzbGlkZXMnLCBtb2R1bGVEZXBlbmRlbmNpZXMpO1xubGVuYXNsaWRlcy5jb250cm9sbGVyKCdBcHBsaWNhdGlvbkNvbnRyb2xsZXInLCByZXF1aXJlKCcuL2FwcGxpY2F0aW9uLWNvbnRyb2xsZXIuanMnKSk7XG5cbm1vZHVsZS5leHBvcnRzID0gbGVuYXNsaWRlcztcbiIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBBcHBsaWNhdGlvbkNvbnRyb2xsZXIoKXtcbiAgdGhpcy5zbGlkZXNob3cgPSBudWxsO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBhbmd1bGFyLm1vZHVsZSgnbGVuYXNsaWRlcy5hdWRpb3BsYXllcicsIFtdKVxuICAuZGlyZWN0aXZlKCdscEF1ZGlvcGxheWVyJywgcmVxdWlyZSgnLi9scF9hdWRpb3BsYXllci1kaXJlY3RpdmUuanMnKSk7XG4iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gTHBBdWRpb3BsYXllckNvbnRyb2xsZXIoJHNjb3BlKXtcbiAgY29uc29sZS5sb2coJ2ZvbyBjb250cm9sbGVyJywgJHNjb3BlKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKXtcbiAgcmV0dXJuIHtcbiAgICB0ZW1wbGF0ZTogICByZXF1aXJlKCcuL2xwX2F1ZGlvcGxheWVyLmh0bWwnKSxcbiAgICBjb250cm9sbGVyOiByZXF1aXJlKCcuL2xwX2F1ZGlvcGxheWVyLWNvbnRyb2xsZXIuanMnKSxcbiAgICBsaW5rOiBmdW5jdGlvbigpe1xuICAgICAgY29uc29sZS5sb2coJ2ZvbycpO1xuICAgIH1cbiAgfTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9ICc8c3Ryb25nPllPTE88L3N0cm9uZz5cXG4nOyIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBhbmd1bGFyLm1vZHVsZSgnbGVuYXNsaWRlcy5zbGlkZXNob3cnLCBbXSlcbiAgLmRpcmVjdGl2ZSgnbHBTbGlkZXNob3cnLCByZXF1aXJlKCcuL2xwX3NsaWRlc2hvdy1kaXJlY3RpdmUuanMnKSlcbiAgLmRpcmVjdGl2ZSgnbHBTbGlkZScsIHJlcXVpcmUoJy4vbHBfc2xpZGUtZGlyZWN0aXZlLmpzJykpO1xuXG4iLCIndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIExwU2xpZGVDb250cm9sbGVyKCRzY29wZSl7XG4gIHRoaXMuc2xpZGVzaG93ID0gJHNjb3BlLnNsaWRlc2hvdztcbiAgdGhpcy5zbGlkZXNob3cucmVnaXN0ZXJTbGlkZSh0aGlzKTtcbn1cblxuTHBTbGlkZUNvbnRyb2xsZXIucHJvdG90eXBlLmlzVmlzaWJsZSA9IGZ1bmN0aW9uKCl7XG4gICAgcmV0dXJuIHRoaXMuc2xpZGVzaG93LmlzU2xpZGVTZWxlY3RlZCh0aGlzKTtcbn07XG5cbkxwU2xpZGVDb250cm9sbGVyLnByb3RvdHlwZS5zZWxlY3QgPSBmdW5jdGlvbigpe1xuICB0aGlzLnNsaWRlc2hvdy5zZXRDdXJyZW50KHRoaXMpO1xuICAvLyBTZXQgdXAgYXVkaW9cbn07XG5cblxuXG5tb2R1bGUuZXhwb3J0cyA9IExwU2xpZGVDb250cm9sbGVyO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCl7XG4gIHJldHVybiB7XG4gICAgc2NvcGU6IHRydWUsXG4gICAgY29udHJvbGxlcjogcmVxdWlyZSgnLi9scF9zbGlkZS1jb250cm9sbGVyLmpzJyksXG4gICAgY29udHJvbGxlckFzOiAnc2xpZGUnXG4gIH07XG59O1xuXG4iLCIndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIExwU2xpZGVzaG93Q29udHJvbGxlcigkc2NvcGUpe1xuICB0aGlzLnNsaWRlcyA9IFtdO1xuICB0aGlzLmN1cnJlbnRTbGlkZSA9IG51bGw7XG5cbiAgJHNjb3BlLmFwcC5zbGlkZXNob3cgPSB0aGlzO1xufVxuXG5McFNsaWRlc2hvd0NvbnRyb2xsZXIucHJvdG90eXBlLnJlZ2lzdGVyU2xpZGUgPSBmdW5jdGlvbihzbGlkZSl7XG4gIHRoaXMuc2xpZGVzLnB1c2goc2xpZGUpO1xuICBpZiAoIXRoaXMuaXNTbGlkZVNlbGVjdGVkKCkpIHNsaWRlLnNlbGVjdCgpO1xufTtcblxuTHBTbGlkZXNob3dDb250cm9sbGVyLnByb3RvdHlwZS5zZXRDdXJyZW50ID0gZnVuY3Rpb24oc2xpZGUpe1xuICB0aGlzLmN1cnJlbnRTbGlkZSA9IHNsaWRlO1xufTtcblxuTHBTbGlkZXNob3dDb250cm9sbGVyLnByb3RvdHlwZS5pc1NsaWRlU2VsZWN0ZWQgPSBmdW5jdGlvbihzbGlkZSl7XG4gIGlmIChzbGlkZSkge1xuICAgIHJldHVybiB0aGlzLmN1cnJlbnRTbGlkZSA9PT0gc2xpZGU7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuICEhdGhpcy5jdXJyZW50U2xpZGU7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gTHBTbGlkZXNob3dDb250cm9sbGVyO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCl7XG4gIHJldHVybiB7XG4gICAgY29udHJvbGxlcjogcmVxdWlyZSgnLi9scF9zbGlkZXNob3ctY29udHJvbGxlci5qcycpLFxuICAgIGNvbnRyb2xsZXJBczogJ3NsaWRlc2hvdydcbiAgfTtcbn07XG4iXX0=
