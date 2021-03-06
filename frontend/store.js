import thunkMiddleware from 'redux-thunk';
import createLogger    from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import initialReducers from '_app/dal/initialReducers';

const loggerMiddleware = createLogger();

const store = createStore(
  initialReducers,
  applyMiddleware(
    thunkMiddleware, // lets us dispatch() functions
    loggerMiddleware // neat middleware that logs actions
  )
);

export default store;