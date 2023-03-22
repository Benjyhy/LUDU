import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Location, LocationDocument } from '../../schemas/location.schema';
import { LocationDto } from './dto/location.dto';
import { ObjectId } from 'mongodb';

@Injectable()
export class LocationService {
  constructor(
    @InjectModel(Location.name)
    private locationModel: Model<LocationDocument>,
  ) {}

  public async findAll(): Promise<LocationDocument[]> {
    return await this.locationModel.find().populate('stores').exec();
  }

  public async findById(id: ObjectId | string): Promise<LocationDocument> {
    return await this.locationModel.findById(id).populate('stores');
  }

  public async findByZip(zip: string): Promise<LocationDocument[]> {
    const location = await this.locationModel.aggregate([
      {
        $match: {
          postalCode: Number(zip),
        },
      },
      {
        $lookup: {
          from: 'stores',
          let: { stores: '$stores' },
          pipeline: [
            { $match: { $expr: { $in: ['$_id', '$$stores'] } } },
            {
              $lookup: {
                from: 'copies',
                let: { copies: '$copies' },
                pipeline: [
                  {
                    $match: {
                      $expr: {
                        $in: ['$_id', '$$copies'],
                      },
                    },
                  },
                  {
                    $match: { available: true },
                  },
                  {
                    $addFields: {
                      convertedGameId: { $toObjectId: '$game' },
                    },
                  },
                  {
                    $lookup: {
                      from: 'games',
                      let: { game: '$convertedGameId' },
                      pipeline: [
                        {
                          $match: {
                            $expr: {
                              $eq: ['$_id', '$$game'],
                            },
                          },
                        },
                      ],
                      as: 'game',
                    },
                  },
                ],
                as: 'copies',
              },
            },
          ],
          as: 'stores',
        },
      },
    ]);
    if (location.length === 0)
      throw new NotFoundException(`Location with zipcode ${zip} not found`);

    return location;
  }

  public async findByZipAndCategory(zip: string, categoryId: string): Promise<LocationDocument[]> {
    const location = await this.locationModel.aggregate([
      {
        $match: {
          postalCode: Number(zip),
        },
      },
      {
        $lookup: {
          from: 'stores',
          let: { stores: '$stores' },
          pipeline: [
            { $match: { $expr: { $in: ['$_id', '$$stores'] } } },
            {
              $lookup: {
                from: 'copies',
                let: { copies: '$copies' },
                pipeline: [
                  {
                    $match: {
                      $expr: {
                        $in: ['$_id', '$$copies'],
                      },
                    },
                  },
                  {
                    $match: { available: true },
                  },
                  {
                    $addFields: {
                      convertedGameId: { $toObjectId: '$game' },
                    },
                  },
                  {
                    $lookup: {
                      from: 'games',
                      let: { game: '$convertedGameId' },
                      pipeline: [
                        {
                          $match: {
                            $expr: {
                              $eq: ['$_id', '$$game'],
                            },
                          },
                        },
                        {
                          $match: {
                            categories: {
                              $in: [new mongoose.Types.ObjectId(categoryId)],
                            },
                          },
                        },
                      ],
                      as: 'game',
                    },
                  },
                ],
                as: 'copies',
              },
            },
          ],
          as: 'stores',
        },
      },
    ]);

    if (location.length === 0)
      throw new NotFoundException(`Location with zipcode ${zip} not found`);

    return location;
  }

  public async create(locationDto: LocationDto): Promise<LocationDocument> {
    return await this.locationModel.create(locationDto);
  }

  public async update(id: string, updateLocationDto: LocationDto): Promise<LocationDocument> {
    const existingLocation = await this.locationModel.findByIdAndUpdate(
      { _id: id },
      updateLocationDto,
    );

    if (existingLocation == null) {
      throw new NotFoundException(`Location #${id} not found`);
    }

    return await this.locationModel.findById(id).populate('stores').exec();
  }

  public async remove(id: string): Promise<any> {
    const isLocation = await this.locationModel.findByIdAndRemove(id);

    if (isLocation == null) {
      throw new NotFoundException(`Location #${id} not found`);
    }

    return isLocation;
  }
}
