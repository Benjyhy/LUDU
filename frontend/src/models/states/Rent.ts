import { Copy } from './Copy';
import { User } from './User';

export interface Rent {
  _id: string;
  game: Copy;
  user: User;
  startDate: Date;
  endDate: Date | null;
  duration: number;
  is_delivered: boolean;
}
