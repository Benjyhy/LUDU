import { SET_USER, REMOVE_USER, UPDATE_USER } from '../types/userTypes';
import { ROLES } from 'src/models/states/User';

export interface UserState {
  token: string;
  id: string;
  username: string;
  avatar: string;
  role: ROLES | null;
  email: string;
}

export const setUser = (userState: UserState) => ({
  type: SET_USER,
  payload: userState,
});

export const removeUser = (userState: UserState) => ({
  type: REMOVE_USER,
  payload: userState,
});

export const updateUser = (userState: UserState) => ({
  type: UPDATE_USER,
  payload: userState,
});
