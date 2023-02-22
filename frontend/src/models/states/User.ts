import { Review } from './Review';
export declare enum ROLES {
  USER = 'USER',
  SELLER = 'SELLER',
  ADMIN = 'ADMIN',
}
export type LocalAuth = {
  email: string;
  password: string;
  emailVerified: boolean;
};
export type LoginPayload = {
  username: string;
  password: string;
};

export type Credentials = {
  local: LocalAuth;
};

export interface UserCreate {
  username?: string;
  credentials?: Credentials;
  role?: string;
  phone?: string | number;
  avatar?: string;
  address?: string;
  city?: string;
  postCode?: string | number;
}

export interface User extends UserCreate {
  id: string;
  createdAt: string;
  reviews: Review[] | [];
}

export interface UserFromQuery extends User {
  _id: string;
}

export interface UserLoged {
  token: string;
  user: UserFromQuery;
}
