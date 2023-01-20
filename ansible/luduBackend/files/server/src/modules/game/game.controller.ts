import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  ValidationPipe,
  HttpException,
  HttpStatus,
  NotFoundException,
  Logger,
  Patch,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { GameService } from './game.service';
import { GameDto } from './dto/game.dto';
import { GameUpdateDto } from './dto/game.update.dto';
import { saveImage, deleteImage } from 'src/helpers/Utils';
import { GameDocument, Game } from 'src/schemas/game.schema';
import { ValidateMongoId } from 'src/middlewares/validateMongoId';
import appConfig from 'src/config/app.config';
import { CategoryService } from '../category/category.service';

@Controller('game')
export class GameController {
  constructor(
    private readonly gameService: GameService,
    private readonly categoryService: CategoryService,
  ) {}

  @Get('')
  async findAll(): Promise<GameDocument[]> {
    return await this.gameService.findAll();
  }

  @Get('/:id')
  findById(
    @Param('id')
    id: string,
  ): Promise<GameDocument> {
    return this.gameService.findById(id).then((game) => {
      if (!game) throw new NotFoundException(`Game #${id} not found`);
      return game;
    });
  }

  @Post('')
  async create(
    @Body(new ValidationPipe({ transform: true }))
    gameDto: GameDto,
  ): Promise<GameDocument> {
    const game = await this.gameService.gameAlreadyExist(gameDto.ean);
    if (game)
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'game with the same EAN code already exist',
        },
        HttpStatus.FORBIDDEN,
      );
    // check if each categories exist
    gameDto.categories.map(async (category) => {
      const isCategory = await this.categoryService.findById(category);
      console.log(isCategory);
      if (!isCategory)
        throw new HttpException(
          {
            status: HttpStatus.FORBIDDEN,
            error: 'category not found',
          },
          HttpStatus.FORBIDDEN,
        );
    });
    gameDto.thumbnail = await saveImage(
      gameDto.thumbnail,
      `${appConfig().game.staticFolder}/thumbnail/`,
    );
    return this.gameService.create(gameDto);
  }

  @Put('/:id')
  async update(
    @Param('id', new ValidateMongoId())
    id: string,
    @Body(new ValidationPipe({ transform: true }))
    gameDto: GameUpdateDto,
  ): Promise<GameDocument> {
    const existingGame = await this.gameService.findById(id);
    if (!existingGame) throw new NotFoundException(`Game #${id} not found`);

    // check if each categories exist
    gameDto.categories.map(async (category) => {
      const isCategory = await this.categoryService.findById(category);
      if (!isCategory)
        throw new HttpException(
          {
            status: HttpStatus.FORBIDDEN,
            error: 'category not found',
          },
          HttpStatus.FORBIDDEN,
        );
    });

    // if image was not updated
    if (
      existingGame.thumbnail &&
      existingGame.thumbnail === gameDto.thumbnail
    ) {
      return this.gameService.update(id, gameDto);
    }

    // If image has been updated delete old image

    const isImageDeleted = await deleteImage(
      existingGame.thumbnail,
      `${appConfig().user.staticFolder}/thumbnail/`,
    );

    Logger.log(isImageDeleted);

    // If false, delete has not occur
    if (!isImageDeleted)
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          error: 'An error occur when the images of the game has been deleted',
        },
        HttpStatus.FORBIDDEN,
      );

    gameDto.thumbnail = await saveImage(
      gameDto.thumbnail,
      `${appConfig().game.staticFolder}/thumbnail/`,
    );

    return this.gameService.update(id, gameDto);
  }

  @Delete('/:id')
  async remove(
    @Param('id', new ValidateMongoId())
    id: string,
  ): Promise<GameDocument> {
    const existingGame = await this.gameService.findById(id);
    if (!existingGame) throw new NotFoundException(`Game #${id} not found`);

    const isImageDeleted = await deleteImage(
      existingGame.thumbnail,
      `${appConfig().user.staticFolder}/thumbnail/`,
    );

    Logger.log(isImageDeleted);

    // If false, delete ha not occur
    if (!isImageDeleted)
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          error: 'An error occur when the images of the game has been deleted',
        },
        HttpStatus.FORBIDDEN,
      );

    // delete model only if its images has been deleted
    const gameDeleted = await this.gameService.remove(id);

    return gameDeleted;
  }
}