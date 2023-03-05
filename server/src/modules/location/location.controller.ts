import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LocationDocument } from '../../schemas/location.schema';
import { LocationService } from './location.service';
import { LocationDto } from './dto/location.dto';
import { JWTAuth } from '../../middlewares/decorators/JWTAuth';

@Controller('location')
@ApiTags('Location')
@JWTAuth()
export class LocationController {
  constructor(private locationService: LocationService) {}

  @Get('')
  @ApiOperation({ summary: 'Get all locations' })
  @ApiOkResponse({ description: 'Success', type: LocationDto, isArray: true })
  findAll(): Promise<LocationDocument[]> {
    return this.locationService.findAll();
  }

  @Get('/:zip')
  @ApiOperation({ summary: 'Get location by zip code' })
  @ApiOkResponse({
    description: 'Success',
    type: LocationDto,
    isArray: true,
  })
  findByZip(
    @Param('zip')
    zip: number,
  ): Promise<LocationDocument[]> {
    return this.locationService.findByZip(zip);
  }

  @Get('/id/:id')
  @ApiOperation({ summary: 'Get a location by id' })
  @ApiOkResponse({ description: 'Success', type: LocationDto })
  async findById(@Param('id') id: string): Promise<LocationDocument> {
    try {
      const location = await this.locationService.findById(id);
      if (!location) {
        throw new NotFoundException(`Location #${id} not found`);
      }
      return location;
    } catch (e) {
      console.log(e);
    }
  }

  @Post('')
  @ApiOperation({ summary: 'Create a new location' })
  @ApiOkResponse({ description: 'Success', type: LocationDto })
  create(
    @Body(new ValidationPipe({ transform: true }))
    locationDto: LocationDto,
  ): Promise<LocationDocument> {
    return this.locationService.create(locationDto);
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Create a new location' })
  @ApiOkResponse({ description: 'Success', type: LocationDto })
  update(
    @Param('id')
    id: string,
    @Body(new ValidationPipe({ transform: true }))
    locationDto: LocationDto,
  ): Promise<LocationDocument> {
    return this.locationService.update(id, locationDto);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete a location' })
  @ApiOkResponse({ description: 'Success', type: LocationDto })
  async remove(
    @Param('id')
    id: string,
  ): Promise<void> {
    await this.locationService.remove(id);
  }
}
