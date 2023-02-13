import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RentDto } from './dto/rent.dto';
import { Model } from 'mongoose';
import { RentDocument } from '../../schemas/rent.schema';

@Injectable()
export class RentService {
  constructor(
    @InjectModel('Rent')
    private rentModel: Model<RentDocument>,
  ) {}

  public async findAll(done: string, is_delivered: string): Promise<RentDocument[]> {
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

  public create(RentDto: RentDto): Promise<RentDocument> {
    return this.rentModel.create(RentDto);
  }

  public async update(id: string, RentDto: RentDto): Promise<RentDocument> {
    return await this.rentModel.findByIdAndUpdate({ _id: id }, RentDto);
  }

  public async updateDelivered(id: string): Promise<RentDocument> {
    await this.rentModel.updateOne({ _id: id }, { $set: { is_delivered: true } });
    return await this.rentModel.findById(id);
  }

  public async updateEndDate(id: string): Promise<RentDocument> {
    await this.rentModel.updateOne({ _id: id }, { $set: { endDate: Date.now() } });
    return await this.rentModel.findById(id);
  }

  public async remove(id: string): Promise<RentDocument> {
    return await this.rentModel.findByIdAndRemove(id);
  }
}
