import { Categories } from './Category';
import { Location } from './Location';
import { RentStatus } from './Rent';
import { User } from './User';

export type MainAppState = {
  currentLocation: Location;
  user: User;
  filterBookingsByStatus: {
    active: false;
    filters: Array<keyof typeof RentStatus | ''>;
  };
  filterGamesByCategories: {
    active: false;
    filters: Array<keyof typeof Categories | ''>;
  };
};
