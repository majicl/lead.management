import thunk from 'redux-thunk';
import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import { collectReducers } from '../reducers/resolver.js';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// eslint-disable-next-line import/no-mutable-exports
let store;

export default () => {
  store = createStore(
    combineReducers(collectReducers()),
    composeEnhancers(applyMiddleware(thunk, promiseMiddleware))
  );

  return store;
};

export { store };
