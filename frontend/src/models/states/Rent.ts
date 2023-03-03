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
  startDate: string;
  game: string;
  user: string;
  type: RentType;
}

export enum RentStatus {
  DELIVERED_AND_RETURNED = 'Delivered & Returned',
  DELIVERED = 'Delivered',
  INPROGRESS = 'In Progress',
}

export enum RentType {
  HOME = 'HOME',
  STORE = 'STORE',
}

export type RentStatusToDisplay = ('Delivered & Returned' | 'Delivered' | 'In Progress')[];
