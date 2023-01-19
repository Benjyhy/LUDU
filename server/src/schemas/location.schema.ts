import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId, Types, Document } from 'mongoose';
import { Transform } from 'class-transformer';
import { Store } from './store.schema';
import { Factory } from 'nestjs-seeder-impsdc';
import { cities, zips } from '../seeders/data.seed';

export type LocationDocument = Location & Document;

@Schema({ timestamps: true })
export class Location {
  @Transform(({ value }) => value.toString())
  _id: ObjectId | string;

  @Factory(() => cities.shift())
  @Prop({ required: true })
  name: string;

  @Factory(() => zips.shift())
  @Prop({ required: true, unique: true })
  postalCode: number;

  @Prop({ type: [Types.ObjectId], ref: 'Store' })
  stores: Store[];
}

export const LocationSchema = SchemaFactory.createForClass(Location);
