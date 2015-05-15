'use strict';

var _ = require('lodash-node/modern');
var angular = require('angular');

// Global requires:
require('../vendor/angular.audio.js');
require('angular-route');

var submodules = [
  require('./audioplayer'),
  require('./slideshow'),
];

var moduleDependencies = [
  'ngRoute',
  'ngAudio'
].concat(_.map(submodules, 'name'));

var lenaslides = angular.module('lenaslides', moduleDependencies);
lenaslides.controller('ApplicationController', require('./application-controller.js'));
lenaslides.config(['$routeProvider', function($routeProvider){
  $routeProvider.when('/:slideId', {});
  $routeProvider.otherwise({});
}]);

module.exports = lenaslides;
