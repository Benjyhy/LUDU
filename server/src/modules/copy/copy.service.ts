import { Injectable, NotFoundException } from '@nestjs/common';
import { CopyDto } from './dto/copy.dto';
import { CopyDocument, Copy } from 'src/schemas/copy.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CopyService {
  constructor(
    @InjectModel(Copy.name)
    private CopyModel: Model<CopyDocument>,
  ) {}

  public async findAll(): Promise<CopyDocument[]> {
    return await this.CopyModel.find().populate('game').exec();
  }

  public async findById(id: string): Promise<CopyDocument> {
    return await this.CopyModel.findById(id).populate('game').exec();
  }

  public async create(copyDto: CopyDto): Promise<CopyDocument> {
    return await this.CopyModel.create(copyDto);
  }

  public async update(
    id: string,
    updateCopyDto: CopyDto,
  ): Promise<CopyDocument> {
    const existingCopy = await this.CopyModel.findByIdAndUpdate(
      { _id: id },
      updateCopyDto,
    );

    if (existingCopy == null) {
      throw new NotFoundException(`Copy #${id} not found`);
    }

    return await this.CopyModel.findById(id).populate('stores').exec();
  }

  public async remove(id: string): Promise<any> {
    const isCopy = await this.CopyModel.findByIdAndRemove(id);

    if (isCopy == null) {
      throw new NotFoundException(`Copy #${id} not found`);
    }

    return isCopy;
  }
}
