import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Seeder, DataFactory } from 'nestjs-seeder-impsdc';
import { Copy } from '../../../schemas/copy.schema';
import { Game } from '../../../schemas/game.schema';
import { Store } from '../../../schemas/store.schema';

@Injectable()
export class CopySeeder implements Seeder {
  constructor(
    @InjectModel(Copy.name) private readonly copy: Model<Copy>,
    @InjectModel(Game.name) private readonly game: Model<Game>,
    @InjectModel(Store.name) private readonly store: Model<Store>,
  ) {}

  async seed(): Promise<any> {
    const games = await this.game.find();
    // Generate 10 copy game.
    const copies = DataFactory.createForClass(Copy).generate(10, {
      game: games[
        Math.round(Math.floor(Math.random() * (await games).length))
      ]._id.toString(),
    });

    // Insert into the database.
    return this.copy.insertMany(copies);
  }

  async drop(): Promise<any> {
    return this.copy.deleteMany({});
  }
}
