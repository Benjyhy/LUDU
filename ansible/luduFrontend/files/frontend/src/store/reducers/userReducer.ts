import { SET_USER, REMOVE_USER, UPDATE_USER } from '../types/userTypes';
import { ROLES } from '../../models/states/User';
import { Action } from '../../models/Action';

const InitalUserState = {
  token: '',
  id: '',
  username: '',
  avatar: '',
  role: null,
  email: '',
};

const userReducer = (state = InitalUserState, action: Action<any>) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        token: action.payload.token,
        id: action.payload.id,
        username: action.payload.username,
        avatar: action.payload.avatar,
        role: action.payload.role,
        email: action.payload.email,
      };
    case REMOVE_USER:
      return {
        ...state,
        token: '',
        id: '',
        username: '',
        avatar: '',
        role: ROLES.USER,
        email: '',
      };
    case UPDATE_USER:
      return {
        ...state,
        token: action.payload.token,
        id: action.payload.id,
        username: action.payload.username,
        avatar: action.payload.avatar,
        role: action.payload.role,
        email: action.payload.email,
      };
    default:
      return state;
  }
};
export default userReducer;
