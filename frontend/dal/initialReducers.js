import { combineReducers } from 'redux';
import flight              from '_app/dal/flight/reducer';

const initialReducers = combineReducers({
  flight
});

export default initialReducers;

