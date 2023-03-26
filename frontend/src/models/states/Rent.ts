import { Copy } from './Copy';
import { User } from './User';

export interface Rent {
  _id: string;
  game: Copy;
  copy: any;
  user: User;
  startDate: Date | string;
  endDate?: string | null;
  deliveredDate?: string | null;
  createdAt: Date | string;
  updatedAt: string | null;
  type: RentType;
}

export interface CreateRentPayload {
  startDate: Date;
  game: any;
  user: string;
  type: RentType;
}

export enum RentStatus {
  OVER = 'Over',
  INPROGRESS = 'In Progress',
  INCOMING = 'Incoming',
}

export enum RentType {
  HOME = 'HOME',
  STORE = 'STORE',
}

export type RentStatusToDisplay = ('Over' | 'In Progress' | 'Incoming')[];
