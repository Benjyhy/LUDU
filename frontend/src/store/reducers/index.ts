import { combineReducers } from 'redux';
import currentLocationReducer from './currentLocationReducer';
import filterGamesByCategoriesReducer from './filterGamesByCategoriesReducer';
import filterBookingsByStatusReducer from './filterBookingsByStatusReducer';
import userReducer from './userReducer';
import { api } from '../../services/api';

export default combineReducers({
  currentLocation: currentLocationReducer,
  user: userReducer,
  filterGamesByCategories: filterGamesByCategoriesReducer,
  filterBookingsByStatus: filterBookingsByStatusReducer,
  [api.reducerPath]: api.reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});
