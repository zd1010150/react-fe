import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import makeRootReducer from './reducers';

export default function configureStore( initialState = {} ) {
  const store = createStore(
    state => state,
    initialState,
    applyMiddleware(thunk) // routerMiddleware redux 方式的回退
  )
  store.asyncReducers = {}

  // if (module.hot) {
  //   module.hot.accept('./reducers', () => {
  //     const reducers = require('./reducers').default; // eslint-disable-line global-require
  //     store.replaceReducer(reducers(store.asyncReducers));
  //   });
  // }

  return store
}
