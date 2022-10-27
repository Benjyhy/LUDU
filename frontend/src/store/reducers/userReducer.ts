import { SET_USER, REMOVE_USER, UPDATE_USER } from '../types/userTypes';
import { User, InitalUser } from '../../models/states/User';
import { Action } from '../../models/Action';

const userReducer = (state = InitalUser, action: Action<any>) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        latitude: action.payload.latitude,
        longitude: action.payload.longitude,
      };
    case REMOVE_USER:
      return {
        ...state,
      };
    default:
      return state;
  }
};
export default userReducer;
