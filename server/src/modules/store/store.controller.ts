import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { StoreService } from './store.service';
import { StoreDocument, Store } from '../../schemas/store.schema';
import { StoreDto } from './dto/store.dto';
import { JWTAuth } from 'src/middlewares/decorators/JWTAuth';
import { Roles } from 'src/middlewares/decorators/RoleAuth';
import { ROLES } from 'src/schemas/user.schema';

@Controller('store')
@ApiTags('Store')
@JWTAuth()
export class StoreController {
  constructor(private storeService: StoreService) {}

  @Get('')
  @Roles(ROLES.ADMIN)
  findAll(): Promise<StoreDocument[]> {
    return this.storeService.findAll();
  }

  @Get('/:id')
  findById(
    @Param('id')
    id: string,
  ): Promise<StoreDocument> {
    return this.storeService.findById(id);
  }

  @Post('')
  create(
    @Body(new ValidationPipe({ transform: true }))
    storeDto: StoreDto,
  ): Promise<StoreDocument> {
    return this.storeService.create(storeDto);
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Create a new location' })
  @ApiOkResponse({ description: 'Success', type: Store })
  update(
    @Param('id')
    id: string,
    @Body(new ValidationPipe({ transform: true }))
    locationDto: StoreDto,
  ): Promise<StoreDocument> {
    return this.storeService.update(id, locationDto);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete a location' })
  @ApiOkResponse({ description: 'Success', type: Store })
  async remove(
    @Param('id')
    id: string,
  ): Promise<void> {
    await this.storeService.remove(id);
  }
}
