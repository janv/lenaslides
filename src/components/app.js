import React from 'react';
import { connect } from 'react-redux';
import Slideshow from './slideshow';
import Audioplayer from './audioplayer';

class App extends React.Component {
  render(){
    const {dispatch, audio} = this.props;
    return <div>
      <Slideshow/>
      <Audioplayer dispatch={dispatch} audio={audio}/>
    </div>;
  }
}

export default connect(state => state)(App);
