import React from 'react';
import _ from 'lodash';

export default class AudioElement extends React.Component {
  render(){
    return <audio loop src={this.props.src} style={{display: 'none'}}></audio>;
  }

  componentDidMount(){
    if (this.props.playing) {
      this.play();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.playing) {
      this.play();
    } else {
      this.stop();
    }
  }

  stop(){
    const node = React.findDOMNode(this);
    node.pause();
    node.currentTime = 0;
  }

  play(){
    const node = React.findDOMNode(this);
    node.play();
  }
}
