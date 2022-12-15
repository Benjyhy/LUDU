import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Seeder, DataFactory } from 'nestjs-seeder-impsdc';
import { Copy } from '../../../schemas/copy.schema';
import { User } from '../../../schemas/user.schema';
import { Rent } from '../../../schemas/rent.schema';

@Injectable()
export class RentSeeder implements Seeder {
  constructor(
    @InjectModel(Copy.name) private readonly copy: Model<Copy>,
    @InjectModel(User.name) private readonly user: Model<User>,
    @InjectModel(Rent.name) private readonly rent: Model<Rent>,
  ) {}

  async seed(): Promise<any> {
    const users = await this.user.find();
    const copies = await this.copy.find();
    // Generate 10 copy game.
    const rents = DataFactory.createForClass(Rent).generate(10, {
      user: users[
        Math.round(Math.floor(Math.random() * users.length))
      ]._id.toString(),
      copy: copies[
        Math.round(Math.floor(Math.random() * copies.length))
      ]._id.toString(),
    });

    // Insert into the database.
    return this.rent.insertMany(rents);
  }

  async drop(): Promise<any> {
    return this.rent.deleteMany({});
  }
}
