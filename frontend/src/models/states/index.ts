import { Categories } from './Category';
import { Location } from './Location';
import { RentStatus } from './Rent';
import { UserState } from './User';

export type MainAppState = {
  currentLocation: Location;
  user: UserState;
  filterBookingsByStatus: {
    active: false;
    filters;
  };
  filterGamesByCategories: {
    active: false;
    filters: Array<keyof typeof Categories | ''>;
  };
};
