'use strict';

var angular = require('angular');

module.exports = angular.module('lenaslides.audioplayer', [])
  .directive('lpAudioplayer', require('./lp_audioplayer-directive.js'));
