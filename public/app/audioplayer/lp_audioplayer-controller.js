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
