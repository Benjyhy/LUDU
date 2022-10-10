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
    const users = DataFactory.createForClass(Game).generate(10, {
      thumbnail: '191efb94-211a-4f7f-992f-d2b3b0be448a',
      categories: [
        categories[
          Math.round(Math.floor(Math.random() * (await categories).length))
        ]._id.toString(),
      ],
    });

    // Insert into the database.
    return this.game.insertMany(users);
  }

  async drop(): Promise<any> {
    return this.game.deleteMany({});
  }
}
