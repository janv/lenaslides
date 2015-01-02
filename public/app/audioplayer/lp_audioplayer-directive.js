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
