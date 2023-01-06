import { StoreService } from './../store.service';
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
    @InjectModel(Store.name) private readonly storeService: StoreService,
    @InjectModel(Location.name) private readonly location: Model<Location>,
  ) {}

  async seed(): Promise<any> {
    const locations = await this.location.find();
    console.log(
      locations[
        Math.round(Math.floor(Math.random() * (await locations).length))
      ]._id.toString(),
    );

    const stores = DataFactory.createForClass(Store).generate(5, {
      iban: 'FR7630003035409876543210925',
      location:
        locations[
          Math.round(Math.floor(Math.random() * (await locations).length))
        ]._id.toString(),
    });

    stores.map(async (item: any) => {
      console.log(item);
      const created = await this.store.create(item);
      // const location = await this.location.findById(item.location);
      // location.stores.push(created);
      // await location.save();
    });

    return;
  }

  async drop(): Promise<any> {
    return this.store.deleteMany({});
  }
}
