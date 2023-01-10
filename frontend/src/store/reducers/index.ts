import { combineReducers } from 'redux';
import currentLocationReducer from './currentLocationReducer';
import userReducer from './userReducer';

export default combineReducers({
    currentLocation: currentLocationReducer,
    user: userReducer,
});