import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  Put,
} from '@nestjs/common';
import { CopyService } from './copy.service';
import { CopyDto } from './dto/copy.dto';
import { StoreService } from '../store/store.service';
import { GameService } from '../game/game.service';
import { ApiTags } from '@nestjs/swagger';
import { JWTAuth } from '../../middlewares/decorators/JWTAuth';

@Controller('copy')
@ApiTags('Copy')
@JWTAuth()
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

    if (!existingGame) throw new NotFoundException(`Game #${copyDto.game} not found`);

    const existingStore = await this.storeService.findById(copyDto.store);
    if (!existingStore) throw new NotFoundException(`Store #${copyDto.store} not found`);

    // Create the copy
    const copyCreated = await this.copyService.create(copyDto);

    const store = await this.storeService.findById(copyDto.store);
    // merge old copies with the new one
    const newCopies = [...store.copies, copyCreated];
    // console.log(newCopies);

    // store with his copies
    await this.storeService.updateCopies(copyDto.store, newCopies);
    return copyCreated;
  }

  @Get()
  findAll() {
    return this.copyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.copyService.findById(id).then((copy) => {
      if (!copy) throw new NotFoundException(`Copy #${id} not found`);
      return copy;
    });
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() CopyDto: CopyDto) {
    return this.copyService.update(id, CopyDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const existingCopy = await this.copyService.findById(id);

    if (!existingCopy) throw new NotFoundException(`Store #${id} not found`);

    const store = await this.storeService.findByCopy(id);

    const newCopies = store.copies.filter((item) => {
      return item.toString() !== id;
    });
    await this.storeService.updateCopies(store._id.toString(), newCopies);
    return this.copyService.remove(id);
  }
}
