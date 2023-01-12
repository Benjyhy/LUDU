import { Location } from './Location';
import { User } from './User';

export type MainAppState = {
    currentLocation: Location;
    user: User;
};