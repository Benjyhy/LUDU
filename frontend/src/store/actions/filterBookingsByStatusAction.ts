import {
  SET_STATUS_FILTER,
  RESET_STATUS_FILTER,
  ACTIVATE_STATUS_FILTER,
  DEACTIVATE_STATUS_FILTER,
} from '../types/filterBookingsByStatusTypes';
import { RentStatus } from '../../models/states/Rent';

export const setStatusFilter = (filter: Array<keyof typeof RentStatus>) => ({
  type: SET_STATUS_FILTER,
  payload: filter,
});
export const resetStatusFilter = () => ({
  type: RESET_STATUS_FILTER,
});
export const activateStatusFilter = () => ({
  type: ACTIVATE_STATUS_FILTER,
});
export const deactivateStatusFilter = () => ({
  type: DEACTIVATE_STATUS_FILTER,
});
