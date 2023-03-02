import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RentDto } from './dto/rent.dto';
import { Model } from 'mongoose';
import { RENT, RentDocument } from '../../schemas/rent.schema';

@Injectable()
export class RentService {
  constructor(
    @InjectModel('Rent')
    private rentModel: Model<RentDocument>,
  ) {}

  public async findAll(done?: string, is_delivered?: string): Promise<RentDocument[]> {
    //  If not params return all rents
    if (!done && !is_delivered) return await this.rentModel.find();
    // filter if rent is still
    if (done === 'true') {
      return await this.rentModel.find({
        is_delivered: JSON.parse(is_delivered),
        endDate: { $ne: null },
      });
    } else {
      return await this.rentModel.find({
        is_delivered: JSON.parse(is_delivered),
        endDate: { $eq: null },
      });
    }
  }

  public async findById(id: string): Promise<RentDocument> {
    return await this.rentModel.findById(id).then((rent) => {
      if (!rent) throw new NotFoundException(`Game #${id} not found`);
      return rent;
    });
  }

  public async findByUserId(
    userId: string,
    done: string,
    is_delivered: string,
  ): Promise<RentDocument[]> {
    const rents = await this.rentModel.find({
      user: userId,
    });
    //  If not params return all rents
    if (!done && !is_delivered) return rents;
    // filter if rent is still
    if (done === 'true') {
      return await this.rentModel.find({
        user: userId,
        is_delivered: JSON.parse(is_delivered) ? { $ne: null } : { $eq: null },
        endDate: { $ne: null },
      });
    } else {
      return await this.rentModel.find({
        user: userId,
        is_delivered: JSON.parse(is_delivered) ? { $ne: null } : { $eq: null },
        endDate: { $eq: null },
      });
    }
  }

  public async create(rentDto: RentDto): Promise<RentDocument> {
    const dateEndDateStore = new Date(rentDto.startDate);
    dateEndDateStore.setHours(dateEndDateStore.getHours() + 2);
    if (rentDto.type === RENT.STORE) rentDto.endDate = dateEndDateStore.toISOString();
    return await this.rentModel.create(rentDto);
  }

  public async update(id: string, RentDto: RentDto): Promise<RentDocument> {
    return await this.rentModel.findByIdAndUpdate({ _id: id }, RentDto);
  }

  public async updateDeliveryDate(id: string): Promise<RentDocument> {
    const rent = await this.rentModel.updateOne(
      { _id: id },
      { $set: { deliveredDate: new Date(Date.now()).toISOString() } },
    );
    console.log(rent);
    return await this.rentModel.findById(id);
  }

  public async updateEndDate(id: string): Promise<RentDocument> {
    await this.rentModel.updateOne(
      { _id: id },
      { $set: { endDate: new Date(Date.now()).toISOString() } },
    );
    return await this.rentModel.findById(id);
  }

  public async remove(id: string): Promise<RentDocument> {
    return await this.rentModel.findByIdAndRemove(id);
  }
}
