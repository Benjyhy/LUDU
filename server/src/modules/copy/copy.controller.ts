import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { CopyService } from './copy.service';
import { CopyDto } from './dto/copy.dto';
import { StoreService } from '../store/store.service';
import { GameService } from '../game/game.service';

@Controller('copy')
export class CopyController {
  constructor(
    private readonly copyService: CopyService,
    private readonly storeService: StoreService,
    private readonly gameService: GameService,
  ) {}

  @Post()
  async create(@Body() copyDto: CopyDto) {
    // checking if ID exist
    const existingGame = await this.gameService.findById(copyDto.game);

    if (!existingGame)
      throw new NotFoundException(`Game #${copyDto.game} not found`);

    const existingStore = await this.storeService.findById(copyDto.store);
    if (!existingStore)
      throw new NotFoundException(`Store #${copyDto.store} not found`);

    // Create the copy
    const copyCreated = await this.copyService.create(copyDto);

    const store = await this.storeService.findById(copyDto.store);
    // merge old copies with the new one
    const newCopies = [...store.copies, copyCreated._id.toString()];

    // return store with his copies
    return await this.storeService.updateCopies(copyDto.store, newCopies);
  }

  @Get()
  findAll() {
    return this.copyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.copyService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() CopyDto: CopyDto) {
    return this.copyService.update(id, CopyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.copyService.remove(id);
  }
}
