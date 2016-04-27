import React from 'react';
import Slide from './slide';
import {nextSlide, prevSlide} from '../reducers/slide';

export default class SlideShow extends React.Component {
  render(){
    const {dispatch, slide} = this.props;
    const slideNumber = slide.slideNumbers[slide.currentSlideIndex];
    // Only show nav buttons if applicable (hasNext/hasPrev)
    return <div className="lp-slideshow">
      <Slide number={slideNumber}/>
      <a className="nav-button fading nav-left" onClick={::this.prevSlide}><span>◀︎</span></a>
      <a className="nav-button fading nav-right" onClick={::this.nextSlide}><span>▶︎</span></a>
    </div>;
  }

  nextSlide(){
    this.props.dispatch(nextSlide());
  }

  prevSlide(){
    this.props.dispatch(prevSlide());
  }
}
