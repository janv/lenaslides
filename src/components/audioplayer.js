import React from 'react';
import _ from 'lodash';
import * as audioReducer from '../reducers/audio';
import AudioElement from './audioelement';

export default class Audioplayer extends React.Component {
  render(){
    const {audio} = this.props;
    const currentSong = audio.songs[audio.selectedSong];
    const src = currentSong && ('/audio/' + currentSong.file);

    return <div className="lp-audioplayer">
      <ul className="song-list">
        {audio.songs.map((song, i) => {
          const isSelected = audio.selectedSong === i;
          const playing = isSelected && audio.playing;

          return <li className={songClass(isSelected)} onClick={() => this.toggleSong(i)}>
            <i className={buttonClass(playing)}></i>
            <span className="song-title">{song.title}</span>
          </li>;
        })}
      </ul>
      <AudioElement src={src} ref="audio" playing={audio.playing}/>
    </div>;
  }

  toggleSong(i){
    const dispatch = this.props.dispatch;
    dispatch(audioReducer.toggleSong(i));
  }
}

function songClass(isSelected) {
  return 'song-list-item cf' + (isSelected ? ' current-song' : '');
}

function buttonClass(isPlaying) {
  return 'song-button fa ' + (isPlaying ? 'fa-pause' : 'fa-play');
}
