import {
  SET_CATEGORY_FILTER,
  RESET_CATEGORY_FILTER,
  ACTIVATE_CATEGORY_FILTER,
  DEACTIVATE_CATEGORY_FILTER,
} from '../types/filterGamesByCategoriesTypes';
import { Categories } from '../../models/states/Category';
import { Action } from '../../models/Action';

const initialState: {
  active: boolean;
  filters: Array<keyof typeof Categories | ''>;
} = {
  active: false,
  filters: [],
};

const filterGamesByCategoriesReducer = (
  state = initialState,
  action: Action<any>,
) => {
  switch (action.type) {
    case SET_CATEGORY_FILTER:
      if (!state.filters.includes(action.payload))
        return { ...state, filters: [...state.filters, action.payload] };
      else return state;
    case RESET_CATEGORY_FILTER:
      return initialState;
    case ACTIVATE_CATEGORY_FILTER:
      return { ...state, active: true };
    case DEACTIVATE_CATEGORY_FILTER:
      return { ...state, active: false };
    default:
      return state;
  }
};
export default filterGamesByCategoriesReducer;
