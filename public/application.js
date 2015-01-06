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

  $scope.$watch('slideshow.currentSlide', slideChanged);
  $scope.$on('$routeChangeSuccess', routeChanged);

  function slideChanged(newSlide) {
    if (!newSlide) return;
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

module.exports = function LpAudioplayerController(ngAudio, $scope){
  var controller = this;
  this.songs = [
    {
      title: 'Des Cendres',
      file: 'cendres.mp3',
      audioObject: null
    },
    {
      title: 'Acoustic Breeze',
      file: 'bensound-acousticbreeze.mp3',
      audioObject: null
    },
    {
      title: 'The Elevator Bossa Nova',
      file: 'bensound-theelevatorbossanova.mp3',
      audioObject: null
    },
  ];

  play(this.songs[0]);

  this.play = play;
  this.pause = pause;
  this.toggleSong = toggleSong;
  this.buttonClass = buttonClass;
  this.isCurrent = isCurrent;

  $scope.$watch(isSongDone, playNext);


  function isSongDone() {
    var aO = controller.currentSong && controller.currentSong.audioObject;
    if (aO) {
      return aO.currentTime >= aO.duration;
    } else {
      return undefined;
    }
  }

  function playNext(done, old) {
    if (done && !old) {
      var i = _.findIndex(controller.songs, controller.currentSong);
      var iNext = (i+1) % controller.songs.length;
      play(controller.songs[iNext]);
    }
  }

  function toggleSong(song) {
    if (!isPlaying(song)) play(song);
    else pause();
  }

  function isPlaying(song) {
    return song && song.audioObject && !song.audioObject.paused;
  }

  function isCurrent(song) {
    return controller.currentSong === song;
  }
 
  function play(song){
    if (song === controller.currentSong) {
      song.audioObject.play();
    } else {
      stop();
      controller.currentSong = song;
      if (!song.audioObject) {
        song.audioObject = ngAudio.play('audio/'+song.file);
      } else {
        song.audioObject.play();
      }
    }
  }

  function pause() {
    if (controller.currentSong) {
      controller.currentSong.audioObject.pause();
    }
  }

  function stop(){
    if (controller.currentSong) {
      if (controller.currentSong.audioObject){
        controller.currentSong.audioObject.stop();
      }
    }
  }

  function buttonClass(song) {
    return isPlaying(song) ? 'fa-pause' : 'fa-play';
  }
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
module.exports = '<ul class="song-list">\n  <li class="song-list-item cf" ng-repeat="song in player.songs" ng-click="player.toggleSong(song)" ng-class="{\'current-song\': player.isCurrent(song)}">\n    <i class="song-button fa" ng-class="player.buttonClass(song)"></i>\n    <span class="song-title">{{song.title}}</span>\n  </li>\n</ul>\n';
},{}],"/Users/jan/development/lenaslides/public/app/slideshow/index.js":[function(require,module,exports){
'use strict';

module.exports = angular.module('lenaslides.slideshow', [])
  .directive('lpSlideshow', require('./lp_slideshow-directive.js'))
  .directive('lpSlide', require('./lp_slide-directive.js'));


},{"./lp_slide-directive.js":"/Users/jan/development/lenaslides/public/app/slideshow/lp_slide-directive.js","./lp_slideshow-directive.js":"/Users/jan/development/lenaslides/public/app/slideshow/lp_slideshow-directive.js"}],"/Users/jan/development/lenaslides/public/app/slideshow/lp_slide-controller.js":[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi8uLiIsImFwcGxpY2F0aW9uLWNvbnRyb2xsZXIuanMiLCJhdWRpb3BsYXllci9pbmRleC5qcyIsImF1ZGlvcGxheWVyL2xwX2F1ZGlvcGxheWVyLWNvbnRyb2xsZXIuanMiLCJhdWRpb3BsYXllci9scF9hdWRpb3BsYXllci1kaXJlY3RpdmUuanMiLCJhdWRpb3BsYXllci9scF9hdWRpb3BsYXllci5odG1sIiwic2xpZGVzaG93L2luZGV4LmpzIiwic2xpZGVzaG93L2xwX3NsaWRlLWNvbnRyb2xsZXIuanMiLCJzbGlkZXNob3cvbHBfc2xpZGUtZGlyZWN0aXZlLmpzIiwic2xpZGVzaG93L2xwX3NsaWRlc2hvdy1jb250cm9sbGVyLmpzIiwic2xpZGVzaG93L2xwX3NsaWRlc2hvdy1kaXJlY3RpdmUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgc3VibW9kdWxlcyA9IFtcbiAgcmVxdWlyZSgnLi9hdWRpb3BsYXllcicpLFxuICByZXF1aXJlKCcuL3NsaWRlc2hvdycpXG5dO1xuXG52YXIgbW9kdWxlRGVwZW5kZW5jaWVzID0gW1xuICAnbmdBdWRpbycsXG4gICduZ1JvdXRlJ1xuXS5jb25jYXQoXy5tYXAoc3VibW9kdWxlcywgJ25hbWUnKSk7XG5cbnZhciBsZW5hc2xpZGVzID0gYW5ndWxhci5tb2R1bGUoJ2xlbmFzbGlkZXMnLCBtb2R1bGVEZXBlbmRlbmNpZXMpO1xubGVuYXNsaWRlcy5jb250cm9sbGVyKCdBcHBsaWNhdGlvbkNvbnRyb2xsZXInLCByZXF1aXJlKCcuL2FwcGxpY2F0aW9uLWNvbnRyb2xsZXIuanMnKSk7XG5sZW5hc2xpZGVzLmNvbmZpZyhmdW5jdGlvbigkcm91dGVQcm92aWRlcil7XG4gICRyb3V0ZVByb3ZpZGVyLndoZW4oJy86c2xpZGVJZCcsIHt9KTtcbiAgJHJvdXRlUHJvdmlkZXIub3RoZXJ3aXNlKHt9KTtcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGxlbmFzbGlkZXM7XG4iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gQXBwbGljYXRpb25Db250cm9sbGVyKCRzY29wZSwgbmdBdWRpbywgJGxvY2F0aW9uLCAkcm91dGUpe1xuICB0aGlzLnNsaWRlc2hvdyA9IG51bGw7XG5cbiAgJHNjb3BlLiR3YXRjaCgnc2xpZGVzaG93LmN1cnJlbnRTbGlkZScsIHNsaWRlQ2hhbmdlZCk7XG4gICRzY29wZS4kb24oJyRyb3V0ZUNoYW5nZVN1Y2Nlc3MnLCByb3V0ZUNoYW5nZWQpO1xuXG4gIGZ1bmN0aW9uIHNsaWRlQ2hhbmdlZChuZXdTbGlkZSkge1xuICAgIGlmICghbmV3U2xpZGUpIHJldHVybjtcbiAgICAkbG9jYXRpb24ucGF0aCgnLycrbmV3U2xpZGUuaWQpO1xuICB9XG5cbiAgZnVuY3Rpb24gcm91dGVDaGFuZ2VkKCkge1xuICAgIGlmICgkcm91dGUuY3VycmVudC5wYXRoUGFyYW1zLnNsaWRlSWQpIHtcbiAgICAgICRzY29wZS5zbGlkZXNob3cubmF2aWdhdGVUb0lkKCRyb3V0ZS5jdXJyZW50LnBhdGhQYXJhbXMuc2xpZGVJZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICRzY29wZS5zbGlkZXNob3cubmF2aWdhdGVUb0ZpcnN0KCk7XG4gICAgfVxuICB9XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGFuZ3VsYXIubW9kdWxlKCdsZW5hc2xpZGVzLmF1ZGlvcGxheWVyJywgW10pXG4gIC5kaXJlY3RpdmUoJ2xwQXVkaW9wbGF5ZXInLCByZXF1aXJlKCcuL2xwX2F1ZGlvcGxheWVyLWRpcmVjdGl2ZS5qcycpKTtcbiIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBMcEF1ZGlvcGxheWVyQ29udHJvbGxlcihuZ0F1ZGlvLCAkc2NvcGUpe1xuICB2YXIgY29udHJvbGxlciA9IHRoaXM7XG4gIHRoaXMuc29uZ3MgPSBbXG4gICAge1xuICAgICAgdGl0bGU6ICdEZXMgQ2VuZHJlcycsXG4gICAgICBmaWxlOiAnY2VuZHJlcy5tcDMnLFxuICAgICAgYXVkaW9PYmplY3Q6IG51bGxcbiAgICB9LFxuICAgIHtcbiAgICAgIHRpdGxlOiAnQWNvdXN0aWMgQnJlZXplJyxcbiAgICAgIGZpbGU6ICdiZW5zb3VuZC1hY291c3RpY2JyZWV6ZS5tcDMnLFxuICAgICAgYXVkaW9PYmplY3Q6IG51bGxcbiAgICB9LFxuICAgIHtcbiAgICAgIHRpdGxlOiAnVGhlIEVsZXZhdG9yIEJvc3NhIE5vdmEnLFxuICAgICAgZmlsZTogJ2JlbnNvdW5kLXRoZWVsZXZhdG9yYm9zc2Fub3ZhLm1wMycsXG4gICAgICBhdWRpb09iamVjdDogbnVsbFxuICAgIH0sXG4gIF07XG5cbiAgcGxheSh0aGlzLnNvbmdzWzBdKTtcblxuICB0aGlzLnBsYXkgPSBwbGF5O1xuICB0aGlzLnBhdXNlID0gcGF1c2U7XG4gIHRoaXMudG9nZ2xlU29uZyA9IHRvZ2dsZVNvbmc7XG4gIHRoaXMuYnV0dG9uQ2xhc3MgPSBidXR0b25DbGFzcztcbiAgdGhpcy5pc0N1cnJlbnQgPSBpc0N1cnJlbnQ7XG5cbiAgJHNjb3BlLiR3YXRjaChpc1NvbmdEb25lLCBwbGF5TmV4dCk7XG5cblxuICBmdW5jdGlvbiBpc1NvbmdEb25lKCkge1xuICAgIHZhciBhTyA9IGNvbnRyb2xsZXIuY3VycmVudFNvbmcgJiYgY29udHJvbGxlci5jdXJyZW50U29uZy5hdWRpb09iamVjdDtcbiAgICBpZiAoYU8pIHtcbiAgICAgIHJldHVybiBhTy5jdXJyZW50VGltZSA+PSBhTy5kdXJhdGlvbjtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBwbGF5TmV4dChkb25lLCBvbGQpIHtcbiAgICBpZiAoZG9uZSAmJiAhb2xkKSB7XG4gICAgICB2YXIgaSA9IF8uZmluZEluZGV4KGNvbnRyb2xsZXIuc29uZ3MsIGNvbnRyb2xsZXIuY3VycmVudFNvbmcpO1xuICAgICAgdmFyIGlOZXh0ID0gKGkrMSkgJSBjb250cm9sbGVyLnNvbmdzLmxlbmd0aDtcbiAgICAgIHBsYXkoY29udHJvbGxlci5zb25nc1tpTmV4dF0pO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHRvZ2dsZVNvbmcoc29uZykge1xuICAgIGlmICghaXNQbGF5aW5nKHNvbmcpKSBwbGF5KHNvbmcpO1xuICAgIGVsc2UgcGF1c2UoKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGlzUGxheWluZyhzb25nKSB7XG4gICAgcmV0dXJuIHNvbmcgJiYgc29uZy5hdWRpb09iamVjdCAmJiAhc29uZy5hdWRpb09iamVjdC5wYXVzZWQ7XG4gIH1cblxuICBmdW5jdGlvbiBpc0N1cnJlbnQoc29uZykge1xuICAgIHJldHVybiBjb250cm9sbGVyLmN1cnJlbnRTb25nID09PSBzb25nO1xuICB9XG4gXG4gIGZ1bmN0aW9uIHBsYXkoc29uZyl7XG4gICAgaWYgKHNvbmcgPT09IGNvbnRyb2xsZXIuY3VycmVudFNvbmcpIHtcbiAgICAgIHNvbmcuYXVkaW9PYmplY3QucGxheSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdG9wKCk7XG4gICAgICBjb250cm9sbGVyLmN1cnJlbnRTb25nID0gc29uZztcbiAgICAgIGlmICghc29uZy5hdWRpb09iamVjdCkge1xuICAgICAgICBzb25nLmF1ZGlvT2JqZWN0ID0gbmdBdWRpby5wbGF5KCdhdWRpby8nK3NvbmcuZmlsZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzb25nLmF1ZGlvT2JqZWN0LnBsYXkoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBwYXVzZSgpIHtcbiAgICBpZiAoY29udHJvbGxlci5jdXJyZW50U29uZykge1xuICAgICAgY29udHJvbGxlci5jdXJyZW50U29uZy5hdWRpb09iamVjdC5wYXVzZSgpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHN0b3AoKXtcbiAgICBpZiAoY29udHJvbGxlci5jdXJyZW50U29uZykge1xuICAgICAgaWYgKGNvbnRyb2xsZXIuY3VycmVudFNvbmcuYXVkaW9PYmplY3Qpe1xuICAgICAgICBjb250cm9sbGVyLmN1cnJlbnRTb25nLmF1ZGlvT2JqZWN0LnN0b3AoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBidXR0b25DbGFzcyhzb25nKSB7XG4gICAgcmV0dXJuIGlzUGxheWluZyhzb25nKSA/ICdmYS1wYXVzZScgOiAnZmEtcGxheSc7XG4gIH1cbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKXtcbiAgcmV0dXJuIHtcbiAgICB0ZW1wbGF0ZTogICByZXF1aXJlKCcuL2xwX2F1ZGlvcGxheWVyLmh0bWwnKSxcbiAgICBjb250cm9sbGVyOiByZXF1aXJlKCcuL2xwX2F1ZGlvcGxheWVyLWNvbnRyb2xsZXIuanMnKSxcbiAgICBjb250cm9sbGVyQXM6ICdwbGF5ZXInXG4gIH07XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSAnPHVsIGNsYXNzPVwic29uZy1saXN0XCI+XFxuICA8bGkgY2xhc3M9XCJzb25nLWxpc3QtaXRlbSBjZlwiIG5nLXJlcGVhdD1cInNvbmcgaW4gcGxheWVyLnNvbmdzXCIgbmctY2xpY2s9XCJwbGF5ZXIudG9nZ2xlU29uZyhzb25nKVwiIG5nLWNsYXNzPVwie1xcJ2N1cnJlbnQtc29uZ1xcJzogcGxheWVyLmlzQ3VycmVudChzb25nKX1cIj5cXG4gICAgPGkgY2xhc3M9XCJzb25nLWJ1dHRvbiBmYVwiIG5nLWNsYXNzPVwicGxheWVyLmJ1dHRvbkNsYXNzKHNvbmcpXCI+PC9pPlxcbiAgICA8c3BhbiBjbGFzcz1cInNvbmctdGl0bGVcIj57e3NvbmcudGl0bGV9fTwvc3Bhbj5cXG4gIDwvbGk+XFxuPC91bD5cXG4nOyIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBhbmd1bGFyLm1vZHVsZSgnbGVuYXNsaWRlcy5zbGlkZXNob3cnLCBbXSlcbiAgLmRpcmVjdGl2ZSgnbHBTbGlkZXNob3cnLCByZXF1aXJlKCcuL2xwX3NsaWRlc2hvdy1kaXJlY3RpdmUuanMnKSlcbiAgLmRpcmVjdGl2ZSgnbHBTbGlkZScsIHJlcXVpcmUoJy4vbHBfc2xpZGUtZGlyZWN0aXZlLmpzJykpO1xuXG4iLCIndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIExwU2xpZGVDb250cm9sbGVyKCRzY29wZSwgJGF0dHJzKXtcbiAgdGhpcy5pZCA9ICRhdHRycy5pZDtcbiAgdGhpcy5zbGlkZXNob3cgPSAkc2NvcGUuc2xpZGVzaG93O1xuICB0aGlzLnNsaWRlc2hvdy5yZWdpc3RlclNsaWRlKHRoaXMpO1xufVxuXG5McFNsaWRlQ29udHJvbGxlci5wcm90b3R5cGUuaXNWaXNpYmxlID0gZnVuY3Rpb24oKXtcbiAgICByZXR1cm4gdGhpcy5zbGlkZXNob3cuaXNTbGlkZVNlbGVjdGVkKHRoaXMpO1xufTtcblxuTHBTbGlkZUNvbnRyb2xsZXIucHJvdG90eXBlLnNlbGVjdCA9IGZ1bmN0aW9uKCl7XG4gIHRoaXMuc2xpZGVzaG93LnNldEN1cnJlbnQodGhpcyk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IExwU2xpZGVDb250cm9sbGVyO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCl7XG4gIHJldHVybiB7XG4gICAgc2NvcGU6IHRydWUsXG4gICAgY29udHJvbGxlcjogcmVxdWlyZSgnLi9scF9zbGlkZS1jb250cm9sbGVyLmpzJyksXG4gICAgY29udHJvbGxlckFzOiAnc2xpZGUnXG4gIH07XG59O1xuXG4iLCIndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIExwU2xpZGVzaG93Q29udHJvbGxlcigkc2NvcGUpe1xuICB0aGlzLnNsaWRlcyA9IFtdO1xuICB0aGlzLmN1cnJlbnRTbGlkZSA9IG51bGw7XG5cbiAgJHNjb3BlLmFwcC5zbGlkZXNob3cgPSB0aGlzO1xufVxuXG5McFNsaWRlc2hvd0NvbnRyb2xsZXIucHJvdG90eXBlLnJlZ2lzdGVyU2xpZGUgPSBmdW5jdGlvbihzbGlkZSl7XG4gIHRoaXMuc2xpZGVzLnB1c2goc2xpZGUpO1xufTtcblxuTHBTbGlkZXNob3dDb250cm9sbGVyLnByb3RvdHlwZS5zZXRDdXJyZW50ID0gZnVuY3Rpb24oc2xpZGUpe1xuICB0aGlzLmN1cnJlbnRTbGlkZSA9IHNsaWRlO1xufTtcblxuTHBTbGlkZXNob3dDb250cm9sbGVyLnByb3RvdHlwZS5uYXZpZ2F0ZVRvSWQgPSBmdW5jdGlvbihpZCl7XG4gIHZhciBzbGlkZSA9IF8uZmluZCh0aGlzLnNsaWRlcywge2lkOiBpZH0pO1xuICB0aGlzLnNldEN1cnJlbnQoc2xpZGUpO1xufTtcblxuTHBTbGlkZXNob3dDb250cm9sbGVyLnByb3RvdHlwZS5uYXZpZ2F0ZVRvRmlyc3QgPSBmdW5jdGlvbigpe1xuICB0aGlzLnNldEN1cnJlbnQodGhpcy5zbGlkZXNbMF0pO1xufTtcblxuTHBTbGlkZXNob3dDb250cm9sbGVyLnByb3RvdHlwZS5nZXROZXh0SWQgPSBmdW5jdGlvbigpe1xuICB2YXIgY3VycmVudEluZGV4ID0gXy5maW5kSW5kZXgodGhpcy5zbGlkZXMsIHRoaXMuY3VycmVudFNsaWRlKTtcbiAgcmV0dXJuIF8ucmVzdWx0KHRoaXMuc2xpZGVzW2N1cnJlbnRJbmRleCsxXSwgJ2lkJyk7XG59O1xuXG5McFNsaWRlc2hvd0NvbnRyb2xsZXIucHJvdG90eXBlLmdldFByZXZpb3VzSWQgPSBmdW5jdGlvbigpe1xuICB2YXIgY3VycmVudEluZGV4ID0gXy5maW5kSW5kZXgodGhpcy5zbGlkZXMsIHRoaXMuY3VycmVudFNsaWRlKTtcbiAgcmV0dXJuIF8ucmVzdWx0KHRoaXMuc2xpZGVzW2N1cnJlbnRJbmRleC0xXSwgJ2lkJyk7XG59O1xuXG5McFNsaWRlc2hvd0NvbnRyb2xsZXIucHJvdG90eXBlLmlzU2xpZGVTZWxlY3RlZCA9IGZ1bmN0aW9uKHNsaWRlKXtcbiAgaWYgKHNsaWRlKSB7XG4gICAgcmV0dXJuIHRoaXMuY3VycmVudFNsaWRlID09PSBzbGlkZTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gISF0aGlzLmN1cnJlbnRTbGlkZTtcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBMcFNsaWRlc2hvd0NvbnRyb2xsZXI7XG4iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKXtcbiAgcmV0dXJuIHtcbiAgICBjb250cm9sbGVyOiByZXF1aXJlKCcuL2xwX3NsaWRlc2hvdy1jb250cm9sbGVyLmpzJyksXG4gICAgY29udHJvbGxlckFzOiAnc2xpZGVzaG93J1xuICB9O1xufTtcbiJdfQ==
