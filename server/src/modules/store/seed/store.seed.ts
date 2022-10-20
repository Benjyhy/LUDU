import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Seeder, DataFactory } from 'nestjs-seeder-impsdc';
import { Store } from '../../../schemas/store.schema';
import { Location } from '../../../schemas/location.schema';

@Injectable()
export class StoreSeeder implements Seeder {
  constructor(
    @InjectModel(Store.name) private readonly store: Model<Store>,
    @InjectModel(Location.name) private readonly location: Model<Location>,
  ) {}

  async seed(): Promise<any> {
    const locations = await this.location.find();
    // Generate 10 users.
    const stores = DataFactory.createForClass(Store).generate(5, {
      iban: ' FR7630003035409876543210925',
      phone: '0651930450',
      locations:
        locations[
          Math.round(Math.floor(Math.random() * (await locations).length))
        ]._id.toString(),
    });

    // Insert into the database.
    return this.store.insertMany(stores);
  }

  async drop(): Promise<any> {
    return this.store.deleteMany({});
  }
}
