import { Location } from './Location';
import { UserState } from './User';

export type MainAppState = {
  currentLocation: Location;
  user: UserState;
};
