import { Review } from "./Review";
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

export interface User {
  _id: string;
  username: string;
  credentials: Credentials;
  role: ROLES;
  phone: number;
  avatar: string;
  address: string;
  city: string;
  postCode: number;
  store: string;
  reviews: Review[];
}
