/**
 * This module composes redux store instance.
 * Redux store manages many complex states for the app
 */
import {createStore} from 'redux';

import createReducer from './reducer';

/**
 * Factory composing react store with reducers and middlewares
 * @param  {Object} initialState - Instance by calling applyMiddleware
 * @return {Store}
 */
export default function configureStore(initialState) {
  const store = createStore(createReducer(), initialState);

  // Enable Webpack hot module replacement for reducers
  // if (module.hot) {
  //   module.hot.accept('./reducer', () => {
  //     store.replaceReducer(createReducer(store.asyncReducers));
  //   });
  // }


  return store;
}
