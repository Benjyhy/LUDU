import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongoose';
import { Transform } from 'class-transformer';
import { Factory } from 'nestjs-seeder-impsdc';
import { categoryName } from '../seeders/data.seed';

export type CategoryDocument = Category & Document;

@Schema({ timestamps: true })
export class Category {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @Factory(() => categoryName.shift())
  @Prop({ required: true, unique: true })
  name: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
