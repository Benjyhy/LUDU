import { Injectable, NotFoundException } from '@nestjs/common';
import { GameDto } from './dto/game.dto';
import { GameUpdateDto } from './dto/game.update.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { GameDocument } from 'src/schemas/game.schema';

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
    return await this.gameModel.find().populate('categories').exec();
  }

  public async findById(id: string): Promise<GameDocument> {
    return await this.gameModel.findById(id).exec();
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
      .populate('stores');

    if (!createdGame) throw new NotFoundException(`Game #${id} not found`);

    return createdGame;
  }

  public async remove(id: string): Promise<any> {
    const isGame = await this.gameModel.findByIdAndRemove(id);

    if (!isGame) throw new NotFoundException(`Game #${id} not found`);

    return isGame;
  }
}
