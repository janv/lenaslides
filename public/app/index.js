'use strict';

var submodules = [
  require('./audioplayer')
];

var lenaslides = angular.module('lenaslides', _.map(submodules, 'name'));

module.exports = lenaslides;
