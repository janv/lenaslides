import React from 'react';

export default class Slide extends React.Component {
  render(){
    const poster = '/video/' + this.props.number + '.png';
    const video  = '/video/' + this.props.number + '.mp4';

    return <div className="lp-slide">
      <div className="pattern-overlay"></div>
      <video ref="video" preload="none" poster={poster} className="fill-background">
        <source src={video} type="video/mp4"/>
      </video>
    </div>;
  }

  componentDidMount(){
    //React.findDOMNode(this.refs.video).play();
  }
}

