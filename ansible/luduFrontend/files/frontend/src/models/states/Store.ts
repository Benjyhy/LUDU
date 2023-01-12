import { Copy } from './Copy';
import { Review } from './Review';

export interface Store {
    _id: string;
    iban: string;
    name: string;
    address: string;
    owner: string;
    phone: string;
    location: Location;
    copies: Copy[];
    reviews: Review[];
}