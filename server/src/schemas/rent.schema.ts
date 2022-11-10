import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId, Types } from 'mongoose';
import { Transform } from 'class-transformer';
import { Copy } from './copy.schema';
import { User } from './user.schema';
import { Factory } from 'nestjs-seeder-impsdc';

export type RentDocument = Rent & Document;

@Schema({ timestamps: true })
export class Rent {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Copy' })
  @Factory((faker, ctx) => ctx.copy)
  game: Copy;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  @Factory((faker, ctx) => ctx.user)
  user: User;

  @Prop({ type: Date, required: true })
  @Factory((faker) => faker.date.recent())
  startDate: Date;

  @Prop()
  @Factory((faker) => faker.date.future())
  endDate: Date | null;

  @Prop()
  @Factory((faker) => faker.random.numeric(5))
  duration: number;

  @Prop({ default: false })
  @Factory((faker) => faker.datatype.boolean())
  is_delivered: boolean;
}

export const RentSchema = SchemaFactory.createForClass(Rent);

RentSchema.pre<RentDocument>('save', function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const rent = this;
  rent.is_delivered = false;
  next();
});
