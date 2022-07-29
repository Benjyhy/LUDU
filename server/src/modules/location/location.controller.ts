import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Put,
  ValidationPipe,
  Query,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Location, LocationDocument } from '../../schemas/location.schema';
import { LocationService } from './location.service';
import { LocationDto } from './dto/location.dto';

@Controller('location')
@ApiTags('Location')
export class LocationController {
  constructor(private locationService: LocationService) {}

  @Get('')
  @ApiOperation({ summary: 'Get all locations' })
  @ApiOkResponse({ description: 'Success', type: Location, isArray: true })
  findAll(): Promise<LocationDocument[]> {
    return this.locationService.findAll();
  }

  @Get('/:zip')
  @ApiOperation({ summary: 'Get location by zip code' })
  @ApiOkResponse({ description: 'Success', type: Location, isArray: true })
  findByZip(
    @Param('zip')
    zip: number,
  ): Promise<LocationDocument[]> {
    return this.locationService.findByZib(zip);
  }

  @Get('/id/:id')
  @ApiOperation({ summary: 'Get a location by id' })
  @ApiOkResponse({ description: 'Success', type: Location })
  findById(@Param('id') id: string): Promise<LocationDocument> {
    return this.locationService.findById(id);
  }

  @Post('')
  @ApiOperation({ summary: 'Create a new location' })
  @ApiOkResponse({ description: 'Success', type: Location })
  create(
    @Body(new ValidationPipe({ transform: true }))
    locationDto: LocationDto,
  ): Promise<LocationDocument> {
    return this.locationService.create(locationDto);
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Create a new location' })
  @ApiOkResponse({ description: 'Success', type: Location })
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
  @ApiOkResponse({ description: 'Success', type: Location })
  async remove(
    @Param('id')
    id: string,
  ): Promise<void> {
    await this.locationService.remove(id);
  }
}
