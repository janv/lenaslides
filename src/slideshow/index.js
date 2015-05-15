'use strict';

var angular = require('angular');

module.exports = angular.module('lenaslides.slideshow', [])
  .directive('lpSlideshow', require('./lp_slideshow-directive.js'))
  .directive('lpSlide', require('./lp_slide-directive.js'));

