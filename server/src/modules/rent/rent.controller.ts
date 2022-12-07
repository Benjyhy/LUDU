import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { RentService } from './rent.service';
import { RentDto } from './dto/rent.dto';
import { Rent } from 'src/schemas/rent.schema';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import {
  NotFoundException,
  HttpException,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { CopyService } from '../copy/copy.service';
import { UserService } from '../user/user.service';

@Controller('rent')
@ApiTags('Rent')
export class RentController {
  constructor(
    private readonly rentService: RentService,
    private readonly CopyService: CopyService,
    private readonly UserService: UserService,
  ) {}

  @Post()
  async create(@Body() RentDto: RentDto) {
    const availableCopy = await this.CopyService.findById(RentDto.game);
    if (!availableCopy)
      throw new NotFoundException(`Copy #${RentDto.game} not found`);
    const userExist = await this.UserService.findById(RentDto.user);
    if (!userExist)
      throw new NotFoundException(`User #${RentDto.user} not found`);

    if (!availableCopy.available)
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'This game is not available',
        },
        HttpStatus.FORBIDDEN,
      );

    const rent = await this.rentService.create(RentDto);
    // Set the copy unavailable
    this.CopyService.toggleAvailable(RentDto.game.toString());
    return rent;
  }

  @Get()
  @ApiOperation({
    summary: 'Filter all Rent by "done" and "is_delivered" params',
  })
  @ApiOkResponse({ description: 'Success', type: Rent })
  findAll(
    @Query('done') done: string,
    @Query('is_delivered') is_delivered: string,
  ) {
    return this.rentService.findAll(done, is_delivered);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find a rent by its ID' })
  @ApiOkResponse({ description: 'Success', type: Rent })
  async findOne(@Param('id') id: string) {
    return await this.rentService.findById(id).then((rent) => {
      if (!rent) throw new NotFoundException(`Rent #${id} not found`);
      return rent;
    });
  }

  @Get('/delivered/:id')
  @ApiOperation({ summary: 'Game is delivered to the customers' })
  @ApiOkResponse({ description: 'Success', type: Rent })
  async updateDelivered(@Param('id') id: string) {
    const rent = await this.rentService.findById(id);
    if (!rent) throw new NotFoundException(`Rent #${id} not found`);

    rent.is_delivered = true;
    return this.rentService.updateDelivered(id);
  }

  @Get('/done/:id')
  @ApiOperation({ summary: 'Close the rent' })
  @ApiOkResponse({ description: 'Success', type: Rent })
  async updateEndDate(@Param('id') id: string) {
    const rent = await this.rentService.findById(id);
    if (!rent) throw new NotFoundException(`Rent #${id} not found`);

    // Set the copy available
    this.CopyService.toggleAvailable(rent.game.toString());
    return this.rentService.updateEndDate(id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const isRent = await this.rentService.findById(id);
    if (isRent == null) {
      throw new NotFoundException(`Rent #${id} not found`);
    }
    this.CopyService.toggleAvailable(isRent.game.toString());
    return this.rentService.remove(id);
  }
}