import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId, Types } from 'mongoose';
import { Transform } from 'class-transformer';
import { Copy } from './copy.schema';
import { User } from './user.schema';
export type RentDocument = Rent & Document;

@Schema({ timestamps: true })
export class Rent {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Copy' })
  game: Copy;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  user: User;

  @Prop({ type: Date, required: true })
  startDate: Date;

  @Prop()
  endDate: Date | null;

  @Prop()
  duration: number | null;

  @Prop({ default: false })
  is_delivered: boolean;
}

export const RentSchema = SchemaFactory.createForClass(Rent);

RentSchema.pre<RentDocument>('save', function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const rent = this;
  rent.is_delivered = false;
  next();
});
