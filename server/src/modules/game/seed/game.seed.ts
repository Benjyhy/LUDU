import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Seeder, DataFactory } from 'nestjs-seeder-impsdc';
import { Game } from '../../../schemas/game.schema';
import { Category } from '../../../schemas/category.schema';

@Injectable()
export class GameSeeder implements Seeder {
  constructor(
    @InjectModel(Game.name) private readonly game: Model<Game>,
    @InjectModel(Category.name) private readonly category: Model<Category>,
  ) {}

  async seed(): Promise<any> {
    const categories = await this.category.find();
    // Generate 10 users.
    const games = DataFactory.createForClass(Game).generate(10, {
      thumbnail: '3c3f8285-e8b8-4e79-87c3-96943be4e630',
      categories: [
        categories[
          Math.round(Math.floor(Math.random() * (await categories).length))
        ]._id.toString(),
      ],
    });
    console.log(games);

    // Insert into the database.
    return this.game.insertMany(games);
  }

  async drop(): Promise<any> {
    return this.game.deleteMany({});
  }
}
