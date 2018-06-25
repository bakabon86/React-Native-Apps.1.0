import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

//import reducers from '../reducers';
import combineReducers from '../reducers';

const store = createStore(
  combineReducers,
  {},
  compose(
    applyMiddleware(thunk, logger),
  )
);


export default store;
