import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId, Types } from 'mongoose';
import { Transform } from 'class-transformer';
import { User } from './user.schema';

export type GameDocument = Game & Document;

@Schema({ timestamps: true })
export class Game {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ unique: true })
  address: string;

  @Prop({ required: true })
  owner: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ type: Types.ObjectId, ref: 'Location' })
  location: string;
}

export const StoreSchema = SchemaFactory.createForClass(Game);
