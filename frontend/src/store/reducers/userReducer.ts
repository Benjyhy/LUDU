import { SET_USER, REMOVE_USER, UPDATE_USER } from '../types/userTypes';
import { Action } from '../../models/Action';

const InitalUserState = {
  token: '',
  id: '',
  username: '',
  role: null,
};

const userReducer = (state = InitalUserState, action: Action<any>) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        token: action.payload.token,
        id: action.payload.id,
        username: action.payload.username,
        role: action.payload.role,
      };
    case REMOVE_USER:
      return {
        ...state,
        token: '',
        id: '',
        username: '',
        role: null,
      };
    case UPDATE_USER:
      return {
        ...state,
        token: action.payload.token,
        id: action.payload.id,
        username: action.payload.username,
        role: action.payload.role,
      };
    default:
      return state;
  }
};
export default userReducer;
