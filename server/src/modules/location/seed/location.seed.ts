import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Seeder, DataFactory } from 'nestjs-seeder-impsdc';
import { Location } from '../../../schemas/location.schema';

@Injectable()
export class LocationSeeder implements Seeder {
  constructor(
    @InjectModel(Location.name) private readonly location: Model<Location>,
  ) {}

  async seed(): Promise<any> {
    // Generate 5 category .
    const locations = DataFactory.createForClass(Location).generate(5);

    // Insert into the database.
    return this.location.insertMany(locations);
  }

  async drop(): Promise<any> {
    return this.location.deleteMany({});
  }
}
