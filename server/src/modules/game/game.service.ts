import { Injectable, NotFoundException } from '@nestjs/common';
import { GameDto } from './dto/game.dto';
import { GameUpdateDto } from './dto/game.update.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GameDocument } from 'src/schemas/game.schema';
import { Category } from 'src/schemas/category.schema';

@Injectable()
export class GameService {
  constructor(
    @InjectModel('Game')
    private gameModel: Model<GameDocument>,
  ) {}

  async create(gameDto: GameDto): Promise<GameDocument> {
    return this.gameModel.create(gameDto);
  }

  public async findAll(): Promise<GameDocument[]> {
    return await this.gameModel.find().populate('categories', 'name');
  }

  public async findById(id: string): Promise<GameDocument> {
    return await this.gameModel.findById(id).populate('categories');
  }

  public async findByCategory(
    categoryId: string,
  ): Promise<GameDocument[] | []> {
    const gamesByCategory = await this.gameModel.find({
      categories: categoryId,
    });

    if (gamesByCategory.length === 0) return null;

    return gamesByCategory;
  }

  public async gameAlreadyExist(ean: string): Promise<GameDocument> {
    return await this.gameModel.findOne({
      ean: ean,
    });
  }

  public async update(
    id: string,
    updateGameDto: GameUpdateDto,
  ): Promise<GameDocument> {
    const createdGame = await this.gameModel
      .findByIdAndUpdate({ _id: id }, updateGameDto)
      .populate('categories');

    if (!createdGame) throw new NotFoundException(`Game #${id} not found`);

    return createdGame;
  }

  public async updateCategories(
    id: string,
    category: (string | Category)[],
  ): Promise<GameDocument> {
    const updatedGame = await this.gameModel.updateOne(
      { _id: id },
      { $set: { categories: category } },
    );

    if (!updatedGame) throw new NotFoundException(`Game #${id} not found`);

    return await this.gameModel.findById(id);
  }

  public async remove(id: string): Promise<GameDocument> {
    const isGame = await this.gameModel.findByIdAndRemove(id);

    if (!isGame) throw new NotFoundException(`Game #${id} not found`);

    return isGame;
  }
}
