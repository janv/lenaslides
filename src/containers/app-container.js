import React from 'react';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import App from '../components/app.js';
import reducer from '../reducers/index';
import thunk from 'redux-thunk';


function logger({ getState }) {
  return (next) => (action) => {
    console.log('will dispatch', action);

    // Call the next dispatch method in the middleware chain.
    let returnValue = next(action);

    console.log('state after dispatch', getState());

    // This will likely be the action itself, unless
    // a middleware further in chain changed it.
    return returnValue;
  };
}

const store = applyMiddleware(thunk, logger)(createStore)(reducer);

export default class AppContainer {
  render(){
    return <Provider store={store}>
      {() => <App/>}
    </Provider>;
  }
}

