import { Store } from './Store';

export interface Location {
  longitude: number;
  latitude: number;
}

export interface LocationAPI {
  _id: string;
  name: string;
  postalCode: number;
  stores: Store[];
}
