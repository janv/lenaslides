(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"./":[function(require,module,exports){
'use strict';

var submodules = [
  require('./audioplayer')
];

var lenaslides = angular.module('lenaslides', _.map(submodules, 'name'));

module.exports = lenaslides;

},{"./audioplayer":"/Users/jan/development/lenaslides/public/app/audioplayer/index.js"}],"/Users/jan/development/lenaslides/public/app/audioplayer/index.js":[function(require,module,exports){
'use strict';

module.exports = angular.module('lenaslides.audioplayer', [])
  .directive('lpAudioplayer', require('./lp_audioplayer-directive.js'));

},{"./lp_audioplayer-directive.js":"/Users/jan/development/lenaslides/public/app/audioplayer/lp_audioplayer-directive.js"}],"/Users/jan/development/lenaslides/public/app/audioplayer/lp_audioplayer-directive.js":[function(require,module,exports){
'use strict';

module.exports = function(){
  return {
    link: function(){
      console.log('foo');
    }
  };
};

},{}]},{},["./"])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi8uLiIsImF1ZGlvcGxheWVyL2luZGV4LmpzIiwiYXVkaW9wbGF5ZXIvbHBfYXVkaW9wbGF5ZXItZGlyZWN0aXZlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIndXNlIHN0cmljdCc7XG5cbnZhciBzdWJtb2R1bGVzID0gW1xuICByZXF1aXJlKCcuL2F1ZGlvcGxheWVyJylcbl07XG5cbnZhciBsZW5hc2xpZGVzID0gYW5ndWxhci5tb2R1bGUoJ2xlbmFzbGlkZXMnLCBfLm1hcChzdWJtb2R1bGVzLCAnbmFtZScpKTtcblxubW9kdWxlLmV4cG9ydHMgPSBsZW5hc2xpZGVzO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGFuZ3VsYXIubW9kdWxlKCdsZW5hc2xpZGVzLmF1ZGlvcGxheWVyJywgW10pXG4gIC5kaXJlY3RpdmUoJ2xwQXVkaW9wbGF5ZXInLCByZXF1aXJlKCcuL2xwX2F1ZGlvcGxheWVyLWRpcmVjdGl2ZS5qcycpKTtcbiIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpe1xuICByZXR1cm4ge1xuICAgIGxpbms6IGZ1bmN0aW9uKCl7XG4gICAgICBjb25zb2xlLmxvZygnZm9vJyk7XG4gICAgfVxuICB9O1xufTtcbiJdfQ==
