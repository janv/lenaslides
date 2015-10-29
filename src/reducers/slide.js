const initialState = {
  slideNumbers: [ 1,  2,  3,  4,  5,      7,  8,  9, 10,
                 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
                 21, 22, 23, 24, 25 ],
  currentSlideIndex: 1
};

export default function slide(state = initialState, action){
  switch (action.type) {
    case 'NEXT_SLIDE':
      var nextIndex = (state.currentSlideIndex + 1) % state.slideNumbers.length;
      return {
        ...state,
        currentSlideIndex: nextIndex
      };
    case 'PREV_SLIDE':
      var prevIndex = state.currentSlideIndex ? state.currentSlideIndex - 1 : state.slideNumbers.length - 1;
      return {
        ...state,
        currentSlideIndex: prevIndex
      };
    case 'SELECT_SLIDE':
      return {
        ...state,
        currentSlideIndex: action.index
      };
    default:
      return state;
  }
}

export function nextSlide(){
  return { type: 'NEXT_SLIDE' };
}
export function prevSlide(){
  return { type: 'PREV_SLIDE' };
}
export function selectSlide(index){
  return {
    type: 'SELECT_SLIDE',
    index
  };
}
