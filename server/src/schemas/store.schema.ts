import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId, Types } from 'mongoose';
import { Transform } from 'class-transformer';
import { Copy } from './copy.schema';
import { Location } from './location.schema';

export type StoreDocument = Store & Document;

@Schema({ timestamps: true })
export class Store {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @Prop({ required: true })
  iban: string;

  @Prop({ required: true })
  name: string;

  @Prop({ unique: true })
  address: string;

  @Prop({ required: true })
  owner: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ type: Types.ObjectId, ref: 'Location' })
  location: Location;

  @Prop({ type: [Types.ObjectId], ref: 'Copy' })
  copies: Copy[];
}

export const StoreSchema = SchemaFactory.createForClass(Store);
