import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId, Types, Document } from 'mongoose';
import { Transform } from 'class-transformer';
import { Store } from './store.schema';
import { Factory } from 'nestjs-seeder-impsdc';
import { LocationName } from '../seeders/location.data';

export type LocationDocument = Location & Document;

@Schema({ timestamps: true })
export class Location {
  @Transform(({ value }) => value.toString())
  _id: ObjectId | string;

  @Factory(() => LocationName.shift())
  @Prop({ required: true })
  name: string;

  @Factory((faker) => faker.random.numeric(5))
  @Prop({ required: true, unique: true })
  postalCode: number;

  @Prop({ type: [Types.ObjectId], ref: 'Store' })
  stores: Store[];
}

export const LocationSchema = SchemaFactory.createForClass(Location);
