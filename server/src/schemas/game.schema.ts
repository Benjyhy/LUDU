import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId, Types } from 'mongoose';
import { Transform } from 'class-transformer';
import { Category } from './category.schema';
import { Review } from './review.schema';
import { Factory } from 'nestjs-seeder-impsdc';
import { gameName } from '../seeders/game.data';

export type GameDocument = Game & Document;

@Schema({ timestamps: true })
export class Game {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @Factory((faker) => faker.random.numeric(13))
  @Prop({ required: true, unique: true, immutable: true })
  ean: string;

  @Factory(() => gameName.shift())
  @Prop({ required: true })
  name: string;

  @Factory((faker) => faker.random.words(2))
  @Prop({ required: true })
  version: string;

  @Factory((faker) => faker.lorem.text())
  @Prop({ required: true })
  description: string;

  @Factory((faker) => faker.random.numeric(2))
  @Prop({ required: true })
  quantity: number;

  @Factory((faker) => faker.random.numeric(2))
  @Prop({ required: true })
  likes: number;

  @Factory((faker, ctx) => ctx.thumbnail)
  @Prop({ required: true })
  thumbnail: string;

  @Factory(() => {
    const minPlayer = 1;
    const maxPlayer = 12;
    return Math.round(Math.random() * (maxPlayer - minPlayer) + minPlayer);
  })
  @Prop({ required: true })
  players: number[];

  @Factory((faker) => faker.random.numeric(2))
  @Prop({ required: true })
  playTime: number;

  @Factory((faker, ctx) => ctx.categories)
  @Prop({ type: [Types.ObjectId], ref: 'Category' })
  categories: Category[];

  @Prop({ type: [Types.ObjectId], ref: 'Review', default: [] })
  reviews: Review[];
}

export const GameSchema = SchemaFactory.createForClass(Game);
