import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId, Types } from 'mongoose';
import { Transform } from 'class-transformer';
import { Copy } from './copy.schema';
import { Location } from './location.schema';
import { Review } from './review.schema';
import { Factory } from 'nestjs-seeder-impsdc';
import { storeName } from '../seeders/data.seed';
import { addressData } from '../seeders/data.seed';

export type StoreDocument = Store & Document;

@Schema({ timestamps: true })
export class Store {
  @Transform(({ value }) => value.toString())
  _id: ObjectId | string;

  @Factory((faker, ctx) => ctx.iban)
  @Prop({ required: true })
  iban: string;

  @Factory(() => storeName.shift())
  @Prop({ required: true })
  name: string;

  @Factory(() => addressData.shift())
  @Prop({ unique: true })
  address: string;

  @Factory((faker) => faker.name.firstName())
  @Prop({ required: true })
  owner: string;

  @Factory((faker) => faker.phone.number('+33 ## ## ## ##'))
  @Prop({ required: true })
  phone: string;

  @Factory((faker, ctx) => ctx.location)
  @Prop({ type: Types.ObjectId, ref: 'Location' })
  location: Location;

  @Factory((faker, ctx) => ctx.copies)
  @Prop({ type: [Types.ObjectId], ref: 'Copy' })
  copies: Copy[];

  @Factory((faker, ctx) => ctx.reviews)
  @Prop({ type: [Types.ObjectId], ref: 'Review', default: [] })
  reviews: Review[];
}

export const StoreSchema = SchemaFactory.createForClass(Store);
