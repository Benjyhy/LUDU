import { SET_USER } from '../types/userTypes';
import { User } from '../../models/states/User';

export const setUser = (user: User) => ({
  type: SET_USER,
  payload: user,
});
