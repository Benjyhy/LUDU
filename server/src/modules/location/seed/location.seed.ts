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
    const lille = DataFactory.createForClass(Location).generate(1, {
      postalCode: 59000,
    });

    const lyon = DataFactory.createForClass(Location).generate(1, {
      postalCode: 69000,
    });

    // Insert into the database.
    this.location.create(lille);
    this.location.create(lyon);
    return;
  }

  async drop(): Promise<any> {
    return this.location.deleteMany({});
  }
}
