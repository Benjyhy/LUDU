import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Seeder, DataFactory } from 'nestjs-seeder-impsdc';
import { Category } from '../../../schemas/category.schema';

@Injectable()
export class reviewSeeder implements Seeder {
  constructor(
    @InjectModel(Category.name) private readonly category: Model<Category>,
  ) {}

  async seed(): Promise<any> {
    // Generate 5 review .
    const users = DataFactory.createForClass(Category).generate(5);

    // Insert into the database.
    return this.category.insertMany(users);
  }

  async drop(): Promise<any> {
    return this.category.deleteMany({});
  }
}
