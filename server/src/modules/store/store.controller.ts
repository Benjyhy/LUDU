import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  ValidationPipe,
  NotFoundException,
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
// @JWTAuth()
export class StoreController {
  constructor(private storeService: StoreService) {}

  @Get('')
  @Roles(ROLES.ADMIN)
  @ApiOperation({ summary: 'Fetch all stores' })
  @ApiOkResponse({ description: 'Success', type: StoreDto, isArray: true })
  findAll(): Promise<StoreDocument[]> {
    return this.storeService.findAll();
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Find a store by ID' })
  @ApiOkResponse({ description: 'Success', type: StoreDto })
  findById(
    @Param('id')
    id: string,
  ): Promise<StoreDocument> {
    return this.storeService.findById(id).then((store) => {
      if (!store) throw new NotFoundException(`Store #${id} not found`);
      return store;
    });
  }

  @Post('')
  @ApiOperation({ summary: 'Create a store' })
  @ApiOkResponse({ description: 'Success', type: StoreDto })
  create(
    @Body(new ValidationPipe({ transform: true }))
    storeDto: StoreDto,
  ): Promise<StoreDocument> {
    return this.storeService.create(storeDto);
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Update a store' })
  @ApiOkResponse({ description: 'Success', type: StoreDto })
  update(
    @Param('id')
    id: string,
    @Body(new ValidationPipe({ transform: true }))
    locationDto: StoreDto,
  ): Promise<StoreDocument> {
    return this.storeService.update(id, locationDto);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete a store' })
  @ApiOkResponse({ description: 'Success', type: StoreDto })
  async remove(
    @Param('id')
    id: string,
  ): Promise<void> {
    await this.storeService.remove(id);
  }
}
