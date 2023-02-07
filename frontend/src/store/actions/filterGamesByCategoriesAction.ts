import {
  SET_CATEGORY_FILTER,
  RESET_CATEGORY_FILTER,
  ACTIVATE_CATEGORY_FILTER,
  DEACTIVATE_CATEGORY_FILTER,
} from '../types/filterGamesByCategoriesTypes';
import { Categories } from '../../models/states/Category';

export const setCategoryFilter = (filter: Array<keyof typeof Categories>) => ({
  type: SET_CATEGORY_FILTER,
  payload: filter,
});
export const resetCategoryFilter = () => ({
  type: RESET_CATEGORY_FILTER,
});
export const activateCategoryFilter = () => ({
  type: ACTIVATE_CATEGORY_FILTER,
});
export const deactivateCategoryFilter = () => ({
  type: DEACTIVATE_CATEGORY_FILTER,
});
