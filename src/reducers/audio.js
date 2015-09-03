const initialState = {
  songs: [
    {
      title: 'Smells Like... The End of (Green) Tunnel',
      file: 'tunnel.mp3',
      audioObject: null
    },
    {
      title: 'Iceberg',
      file: 'iceberg.mp3',
      audioObject: null
    },
    {
      title: 'Polar Night',
      file: 'polar_night.mp3',
      audioObject: null
    },
    {
      title: 'Snowstorm',
      file: 'snowstorm.mp3',
      audioObject: null
    }
  ],
  selectedSong: null,
  playing: true
};

export default function audio(state = initialState, action){
  switch (action.type) {
    case 'SELECT_SONG':
      return {
        ...state,
        selectedSong: action.index
      };
    case 'PLAY_AUDIO':
      return {
        ...state,
        playing: true
      };
    case 'PAUSE_AUDIO':
      return {
        ...state,
        playing: false
      };
    case 'TOGGLE_SONG':
      return state.selectedSong === action.index ? {
        ...state,
        playing: !state.playing
      } : {
        ...state,
        selectedSong: action.index,
        playing: true
      };
    default:
      return state;
  }
}

export function selectSong(index) {
  return {
    type: 'SELECT_SONG',
    index
  };
}

export function playAudio(index){
  return {
    type: 'PLAY_AUDIO',
    index
  };
}

export function pauseAudio(){
  return {
    type: 'PAUSE_AUDIO'
  };
}

export function toggleSong(index) {
  return {
    type: 'TOGGLE_SONG',
    index
  };
}
