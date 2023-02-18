import { Category } from './Category';
import { Review } from './Review';

export declare class Game {
  _id: string;
  ean: string;
  name: string;
  version: string;
  description: string;
  quantity: number;
  likes: number;
  thumbnail: string;
  tags: Tags;
  categories: Category[];
  reviews: Review[];
}

export interface Tags {
  playtime: number;
  players: number[];
}
export interface CreateGamePayload {
  ean: string;
  name: string;
  version: string;
  description: string;
  likes: number;
  tags: Tags;
  categories: string[];
  thumbnail: string;
}
