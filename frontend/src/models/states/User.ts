import { Review } from './Review';
export declare enum ROLES {
  USER = 0,
  SELLER = 1,
  ADMIN = 2,
}
// export declare class Oauth {
//   token: string;
//   email: string;
//   name: string;
// }
export type LocalAuth = {
  email: string;
  password: string;
  emailVerified: boolean;
};
export type Credentials = {
  local: LocalAuth;
  //   oauth: Oauth;
};

export interface UserCreate {
  username?: string;
  credentials?: Credentials;
  role?: ROLES;
  phone?: string | number;
  avatar?: string;
  address?: string;
  city?: string;
  postCode?: string | number;
}

export interface User extends UserCreate {
  _id: string;
  phone: number;
  postalCode: number;
  store: string | null;
  reviews: Review[] | [];
}

export const InitalUser = {
  username: '',
  credentials: {
    local: {
      email: '',
      password: '',
      emailVerified: false,
    },
  },
  role: ROLES.USER,
  phone: '',
  address: '',
  city: '',
  postCode: '',
  avatar: '',
};
