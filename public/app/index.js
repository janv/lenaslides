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
