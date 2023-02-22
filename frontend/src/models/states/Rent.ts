import { Copy } from './Copy';
import { User } from './User';

export interface Rent {
  _id: string;
  game: Copy;
  user: User;
  startDate: Date | string;
  endDate?: string | null;
  deliveredDate?: string | null;
  duration: number;
  type: RentType;
}

export interface CreateRentPayload {
  startDate: string;
  game: string;
  user: string;
  type: RentType;
}

export enum RentStatus {
  DELIVERED = 'Delivered',
  INPROGRESS = 'In Progress',
}

export enum RentType {
  HOME = 'HOME',
  STORE = 'STORE',
}

export type RentStatusToDisplay = ('Delivered' | 'In Progress')[];
