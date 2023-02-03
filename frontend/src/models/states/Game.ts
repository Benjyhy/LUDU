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
  players: number[];
  playTime: number;
  categories: Category[];
  reviews: Review[];
}
