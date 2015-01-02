'use strict';

module.exports = function(){
  return {
    template:   require('./lp_audioplayer.html'),
    controller: require('./lp_audioplayer-controller.js'),
    controllerAs: 'player'
  };
};
