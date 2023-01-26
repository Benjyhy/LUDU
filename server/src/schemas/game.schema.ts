import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId, Types } from 'mongoose';
import { Transform } from 'class-transformer';
import { Category } from './category.schema';
import { Review } from './review.schema';

export type GameDocument = Game & Document;

@Schema({ timestamps: true })
export class Game {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @Prop({ required: true, unique: true, immutable: true })
  ean: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  version: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true })
  likes: number;

  @Prop({ required: true })
  thumbnail: string;

  @Prop({ required: true })
  players: number[];

  @Prop({ required: true })
  playTime: number;

  @Prop({ type: [Types.ObjectId], ref: 'Category' })
  categories: Category[];

  @Prop({ type: [Types.ObjectId], ref: 'Review', default: [] })
  reviews: Review[];
}

export const GameSchema = SchemaFactory.createForClass(Game);
