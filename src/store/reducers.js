import { combineReducers } from 'redux';
//import loadingReducer from '../flow/loading/loadingReducer';
//import globalsReducer from '../flow/globals/globalsReducer';

export const makeRootReducer = (asyncReducers) => (
  combineReducers({

   // loading: loadingReducer,
    //globals: globalsReducer,
    ...asyncReducers,
  })
);

export const injectReducers = (store, reducers) => {
  store.asyncReducers = { // eslint-disable-line no-param-reassign
    ...store.asyncReducers,
    ...reducers,
  };
  store.replaceReducer(makeRootReducer(store.asyncReducers));
};

export default makeRootReducer;
