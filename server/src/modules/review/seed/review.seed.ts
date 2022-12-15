import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Seeder, DataFactory } from 'nestjs-seeder-impsdc';
import { Review } from '../../../schemas/review.schema';
import { Game } from '../../../schemas/game.schema';
import { Store } from '../../../schemas/store.schema';
import { User } from '../../../schemas/user.schema';

@Injectable()
export class ReviewSeeder implements Seeder {
  constructor(
    @InjectModel(Review.name) private readonly review: Model<Review>,
    @InjectModel(Game.name) private readonly game: Model<Game>,
    @InjectModel(Store.name) private readonly store: Model<Store>,
    @InjectModel(User.name) private readonly user: Model<User>,
  ) {}

  async seed(): Promise<any> {
    const user = await this.user.find();
    const game = await this.game.find();
    const store = await this.store.find();

    const reviewsAboutGames = DataFactory.createForClass(Review).generate(10, {
      user: user[
        Math.round(Math.floor(Math.random() * (await user).length))
      ]._id.toString(),
      game: game[
        Math.round(Math.floor(Math.random() * (await game).length))
      ]._id.toString(),
    });

    const reviewsAboutStores = DataFactory.createForClass(Review).generate(10, {
      user: user[
        Math.round(Math.floor(Math.random() * (await user).length))
      ]._id.toString(),
      store:
        store[
          Math.round(Math.floor(Math.random() * (await store).length))
        ]._id.toString(),
    });

    // Insert into the database.
    this.review.insertMany(reviewsAboutGames);
    return this.review.insertMany(reviewsAboutStores);
  }

  async drop(): Promise<any> {
    return this.review.deleteMany({});
  }
}
