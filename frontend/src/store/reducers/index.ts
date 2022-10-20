import { combineReducers } from 'redux';
import currentLocationReducer from './currentLocationReducer';

export default combineReducers({
  currentLocation: currentLocationReducer,
});
