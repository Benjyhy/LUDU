import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CategoryDto } from './dto/category.dto';
import { Category, CategoryDocument } from 'src/schemas/category.schema';
import { Model } from 'mongoose';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name)
    private locationModel: Model<CategoryDocument>,
  ) {}

  public async findAll(): Promise<CategoryDocument[]> {
    return await this.locationModel.find().populate('games').exec();
  }

  public async findById(id: string): Promise<CategoryDocument> {
    return await this.locationModel.findById(id).populate('games').exec();
  }

  public async create(CategoryDto: CategoryDto): Promise<CategoryDocument> {
    return await this.locationModel.create(CategoryDto);
  }

  public async update(
    id: string,
    updateCategoryDto: CategoryDto,
  ): Promise<CategoryDocument> {
    const existingCategory = await this.locationModel.findByIdAndUpdate(
      { _id: id },
      updateCategoryDto,
    );

    if (existingCategory == null) {
      throw new NotFoundException(`Category #${id} not found`);
    }

    return await this.locationModel.findById(id).populate('games').exec();
  }

  public async remove(id: string): Promise<CategoryDocument> {
    const isCategory = await this.locationModel.findByIdAndRemove(id);

    if (isCategory == null) {
      throw new NotFoundException(`Category #${id} not found`);
    }

    return isCategory;
  }
}
