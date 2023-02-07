import { combineReducers } from 'redux';
import currentLocationReducer from './currentLocationReducer';
import filterGamesByCategoriesReducer from './filterGamesByCategoriesReducer';
import filterBookingsByStatusReducer from './filterBookingsByStatusReducer';
import userReducer from './userReducer';

export default combineReducers({
  currentLocation: currentLocationReducer,
  user: userReducer,
  filterGamesByCategories: filterGamesByCategoriesReducer,
  filterBookingsByStatus: filterBookingsByStatusReducer,
});
